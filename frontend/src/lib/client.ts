import PocketBase from "pocketbase";
import { writable } from "svelte/store";
import { toasts } from "./toast";

const initializedStore = writable(false);
const authorizedStore = writable(false);

class APIClient {
  initialized = initializedStore;
  authorized = authorizedStore;
  #pb: PocketBase;

  constructor(url: string) {
    this.#pb = new PocketBase(url);
    if (this.#pb.authStore.isValid) {
      this.authorized.set(true);
    }
    this.initialized.set(true);
  }

  async logout() {
    try {
      this.#pb.authStore.clear();
      this.authorized.set(false);
      toasts.info("Successfully logged out");
    } catch (error) {
      toasts.error("Failed to logout");
    }
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
    return this.#pb
      .collection("users")
      .create(data)
      .then(() => {
        void this.#pb.collection("users").requestVerification(email);
        toasts.success("User created successfully");
        return true;
      })
      .catch(() => {
        toasts.error("Could not create user");
        return false;
      });
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
