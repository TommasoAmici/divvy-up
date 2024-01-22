import { client } from "$lib/client";
import { paginationFromURL } from "$lib/pagination";

export async function load({ params, url, depends }) {
  const groupID = params.id;

  depends(`${groupID}:expenses`);
  const pagination = paginationFromURL(url);
  const [expenses, expensesSummary] = await Promise.all([
    client.getExpenses(groupID, pagination),
    client.getExpensesSummary(groupID),
  ]);

  return {
    expenses,
    expensesSummary,
  };
}
