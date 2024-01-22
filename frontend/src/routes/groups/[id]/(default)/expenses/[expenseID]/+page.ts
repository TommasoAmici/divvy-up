import { client } from "$lib/client";

export async function load({ params, depends }) {
  const expenseID = params.expenseID;

  depends(`expenses:${expenseID}`);
  const expenseDetails = await client.getExpense(expenseID);

  return {
    expenseID,
    expenseDetails,
  };
}
