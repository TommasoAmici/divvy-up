import { describe, expect, it } from "bun:test";
import {
  balancesSettled,
  expensesToBalance,
  findPayee,
  findPayer,
  settleExpenses,
} from "./settle";

describe("expensesToBalance", () => {
  it("returns balances from expense summaries", () => {
    const expenses = [
      { paid_by: "Tommaso", total: 100 },
      { paid_by: "Tamara", total: 200 },
    ];
    const expected = {
      Tommaso: -50,
      Tamara: 50,
    };
    expect(expensesToBalance(expenses)).toStrictEqual(expected);
  });

  it("returns 0 if a person doesn't owe money", () => {
    const expenses = [
      { paid_by: "Tommaso", total: 100 },
      { paid_by: "Tamara", total: 150 },
      { paid_by: "Giacomo", total: 200 },
    ];
    const expected = {
      Tommaso: -50,
      Tamara: 0,
      Giacomo: 50,
    };
    expect(expensesToBalance(expenses)).toStrictEqual(expected);
  });

  it("returns 0 if balances are set", () => {
    const expenses = [
      { paid_by: "Tommaso", total: 100 },
      { paid_by: "Tamara", total: 100 },
    ];
    const expected = {
      Tommaso: 0,
      Tamara: 0,
    };
    expect(expensesToBalance(expenses)).toStrictEqual(expected);
  });
});

describe("balancesSettled", () => {
  it("returns false if balances are not settled", () => {
    const unsettled = {
      Tommaso: -50,
      Tamara: 0,
      Giacomo: 50,
    };
    expect(balancesSettled(unsettled)).toBe(false);
  });

  it("returns true if balances are settled", () => {
    const settled = {
      Tommaso: 0,
      Tamara: 0,
      Giacomo: 0,
    };
    expect(balancesSettled(settled)).toBe(true);
  });

  it("returns true if balances are settled with a margin of error", () => {
    const settled = {
      Tommaso: 0.01,
      Tamara: -0.001,
      Giacomo: 0,
    };
    expect(balancesSettled(settled)).toBe(true);
  });
});

describe("findPayee", () => {
  it("returns the person who is owed most money", () => {
    const balances = {
      Tommaso: -50,
      Tamara: 0,
      Giacomo: 50,
    };
    const expected = "Giacomo";
    expect(findPayee(balances)).toBe(expected);
  });

  it("returns the person who is owed most money reverse map", () => {
    const balances = {
      Giacomo: 50,
      Tommaso: -50,
      Tamara: 0,
    };
    const expected = "Giacomo";
    expect(findPayee(balances)).toBe(expected);
  });
});

describe("findPayer", () => {
  it("returns the person who owes most money", () => {
    const balances = {
      Tommaso: -50,
      Tamara: 0,
      Giacomo: 50,
    };
    const expected = "Tommaso";
    expect(findPayer(balances)).toBe(expected);
  });

  it("returns the person who owes most money reverse map", () => {
    const balances = {
      Tamara: 0,
      Giacomo: 50,
      Tommaso: -50,
    };
    const expected = "Tommaso";
    expect(findPayer(balances)).toBe(expected);
  });
});

describe("settleExpenses", () => {
  it("returns transactions needed for settling balances", () => {
    const expenses = [
      { paid_by: "Tommaso", total: 100 },
      { paid_by: "Tamara", total: 200 },
    ];
    const expected = [{ payer: "Tommaso", payee: "Tamara", amount: 50 }];
    expect(settleExpenses(expenses)).toStrictEqual(expected);
  });

  it("returns transactions needed for settling balances three way", () => {
    const expenses = [
      { paid_by: "Tommaso", total: 100 },
      { paid_by: "Tamara", total: 200 },
      { paid_by: "Giacomo", total: 300 },
    ];
    const expected = [{ payer: "Tommaso", payee: "Giacomo", amount: 100 }];
    expect(settleExpenses(expenses)).toStrictEqual(expected);
  });

  it("returns transactions needed for settling balances three way with multiple transactions", () => {
    const expenses = [
      { paid_by: "Tommaso", total: 100 },
      { paid_by: "Tamara", total: 200 },
      { paid_by: "Giacomo", total: 450 },
    ];
    const expected = [
      { payer: "Tommaso", payee: "Giacomo", amount: 150 },
      { payer: "Tamara", payee: "Giacomo", amount: 50 },
    ];
    expect(settleExpenses(expenses)).toStrictEqual(expected);
  });
});
