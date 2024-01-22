type Balance = Record<string, number>;

export function balancesSettled(balances: Balance) {
  for (const person in balances) {
    // since we're calculating the balance with a simple average
    // of the totals, it's possible we have extra decimals that
    // are not accounted for.
    // In a real accounting system this would be a real problem,
    // but among friends you can lose the cents, Office Space style.
    if (Math.round(balances[person]) !== 0) {
      return false;
    }
  }
  return true;
}

export function findPayee(balance: Balance) {
  let payee = undefined;
  let max = Number.MIN_VALUE;
  for (const key in balance) {
    if (balance[key] > max) {
      payee = key;
      max = balance[key];
    }
  }
  if (payee === undefined) {
    throw new Error("Can't find payee");
  }
  return payee;
}

export function findPayer(balance: Balance) {
  let payer = undefined;
  let min = Number.MAX_VALUE;
  for (const key in balance) {
    if (balance[key] < min) {
      payer = key;
      min = balance[key];
    }
  }
  if (payer === undefined) {
    throw new Error("Can't find payer");
  }
  return payer;
}

export function expensesToBalance<T extends { total: number; paid_by: string }>(
  summaries: T[]
) {
  let total = 0;
  for (const summary of summaries) {
    total += summary.total;
  }
  const avg = total / summaries.length;
  const balances: Balance = {};
  for (const summary of summaries) {
    balances[summary.paid_by] = summary.total - avg;
  }
  return balances;
}

export function settleExpenses<T extends { total: number; paid_by: string }>(
  summaries: T[]
) {
  const balances = expensesToBalance(summaries);
  const transactions = [];
  while (!balancesSettled(balances)) {
    const payer = findPayer(balances);
    const payee = findPayee(balances);
    const amount = Math.min(
      Math.abs(balances[payer]),
      Math.abs(balances[payee])
    );
    balances[payer] += amount;
    balances[payee] -= amount;
    transactions.push({ payer, payee, amount });
  }
  return transactions;
}
