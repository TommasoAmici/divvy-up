import { invalidate, invalidateAll } from "$app/navigation";
import PocketBase from "pocketbase";
import { writable } from "svelte/store";
import type { Pagination } from "./pagination";

const initializedStore = writable(false);
const authorizedStore = writable(false);

export type Group = {
  id: string;
  name: string;
  members: string[];
  owner: string;
};

export type User = {
  id: string;
  name: string;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  paid_by: User;
};

export type ExpenseImport = {
  description: string;
  amount: number;
  date: string;
};

export type ExpenseSummary = {
  expand: {
    paid_by: User;
  };
  group: string;
  id: string;
  paid_by: string;
  total: number;
};

class APIClient {
  initialized = initializedStore;
  authorized = authorizedStore;
  #pb: PocketBase;

  constructor(url: string) {
    this.#pb = new PocketBase(url);
    this.#pb.autoCancellation(false);
    if (this.#pb.authStore.isValid) {
      this.authorized.set(true);
    }
    this.initialized.set(true);
  }

  get userID() {
    const userID = this.#pb.authStore.model?.id;
    if (typeof userID !== "string") {
      throw new Error("Unauthorized");
    }
    return userID;
  }

  async logout() {
    this.#pb.authStore.clear();
    this.authorized.set(false);
  }

  async login(email: string, password: string) {
    let _authorized = false;
    try {
      await this.#pb.collection("users").authWithPassword(email, password);
      _authorized = true;
    } catch (error) {
      _authorized = false;
    }
    this.authorized.set(_authorized);
    return _authorized;
  }

  async signup(name: string, email: string, password: string) {
    const data = {
      name,
      email,
      password,
      passwordConfirm: password,
    };
    await this.#pb.collection("users").create(data);
    await this.#pb.collection("users").requestVerification(email);
  }

  async addGroup(name: string) {
    const data = {
      name,
      owner: this.userID,
      members: [this.userID],
    };
    const group = await this.#pb.collection("groups").create(data);
    await invalidate("groups:list");
    return group;
  }

  async deleteGroup(groupID: string) {
    await this.#pb.collection("groups").delete(groupID);
    await invalidateAll();
  }

  async getGroups(): Promise<Group[]> {
    return this.#pb.collection("groups").getFullList({ sort: "name" });
  }

  async getGroup(groupID: string): Promise<Group> {
    return this.#pb.collection("groups").getOne(groupID);
  }

  async addUserToGroup(groupID: string, userID: string) {
    try {
      const group: Group = await this.#pb.collection("groups").getOne(groupID);
      const data = {
        members: [...group.members, userID],
      };
      await this.#pb.collection("groups").update(group.id, data);
    } catch (error) {
      throw new Error("Failed to add user to group");
    }
  }

  async getExpense(expenseID: string): Promise<Expense> {
    return this.#pb.collection("expenses").getOne(expenseID);
  }

  async getExpenses(
    groupID: string,
    pagination: Pagination
  ): Promise<{ items: Expense[]; totalItems: number }> {
    return this.#pb
      .collection("expenses")
      .getList(pagination.page, pagination.size, {
        filter: this.#pb.filter("group.id = {:groupID}", { groupID }),
        sort: "-date",
        expand: "paid_by",
      });
  }

  async getExpensesSummary(groupID: string): Promise<ExpenseSummary[]> {
    return this.#pb.collection("to_settle").getFullList({
      filter: this.#pb.filter("group.id = {:groupID}", { groupID }),
      expand: "paid_by",
    });
  }

  #validateExpensePayload(payload: {
    description: string;
    amount: number;
    date: string;
  }) {
    if (payload.description.length === 0) {
      throw new Error("A description is required");
    }
    if (payload.amount <= 0) {
      throw new Error("The amount can't be negative");
    }
  }

  async #invalidateExpenses(groupID: string, expenseID?: string) {
    // await invalidate(`${groupID}:expenses`);
    // await invalidate(`expenses:${expenseID}`);
    await invalidateAll();
  }

  async createExpense(
    groupID: string,
    payload: { description: string; amount: number; date: string }
  ) {
    this.#validateExpensePayload(payload);
    const data = {
      ...payload,
      paid_by: this.userID,
      group: groupID,
    };
    await this.#pb.collection("expenses").create(data);
    await this.#invalidateExpenses(groupID);
  }

  async updateExpense(
    groupID: string,
    expenseID: string,
    payload: { description: string; amount: number; date: string }
  ) {
    this.#validateExpensePayload(payload);
    await this.#pb.collection("expenses").update(expenseID, payload);
    await this.#invalidateExpenses(groupID, expenseID);
  }

  async deleteExpense(groupID: string, expenseID: string) {
    await this.#pb.collection("expenses").delete(expenseID);
    await this.#invalidateExpenses(groupID, expenseID);
  }

  async settleAllExpenses(groupID: string) {
    // TODO change if pocketbase ever introduces batch actions
    const unsettledExpenses = await this.#pb
      .collection("expenses")
      .getFullList({
        filter: this.#pb.filter("group.id = {:groupID}", { groupID }),
      });
    const settled_at = new Date().toISOString();
    const promises = unsettledExpenses.map((e) => {
      this.#pb.collection("expenses").update(e.id, { settled_at });
    });
    await Promise.all(promises);
    await this.#invalidateExpenses(groupID);
  }

  async importExpenses(groupID: string, expenses: ExpenseImport[]) {
    try {
      const promises = expenses.map((e) => {
        this.#validateExpensePayload(e);
        const data = {
          ...e,
          paid_by: this.userID,
          group: groupID,
        };
        return this.#pb.collection("expenses").create(data);
      });
      await Promise.all(promises);
      await this.#invalidateExpenses(groupID);
    } catch (error) {
      throw new Error("Failed to import expenses");
    }
  }

  async getImportSettings() {
    return this.#pb
      .collection("import_settings")
      .getOne<{ settings: Record<string, string | undefined> }>(this.userID);
  }

  /**
   * Saves the import settings in the database so they can be pre-filled next time
   */
  async updateImporterSettings(settings: Record<string, string | undefined>) {
    const data = {
      settings,
      user: this.userID,
    };
    try {
      await this.#pb.collection("import_settings").update(this.userID, data);
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof error?.data === "object" &&
        error.data !== null &&
        "code" in error.data &&
        error.data.code === 404
      ) {
        await this.#pb
          .collection("import_settings")
          .create({ ...data, id: this.userID });
      } else {
        throw error;
      }
    }
  }
}

// if localhost, use pocketbase localhost
// otherwise use origin and connect with domain name
let apiURL = "http://127.0.0.1:8090";
if (
  globalThis.window &&
  !globalThis.window.location.origin.includes("localhost")
) {
  apiURL = globalThis.window.location.origin;
}

export const client = new APIClient(apiURL);
