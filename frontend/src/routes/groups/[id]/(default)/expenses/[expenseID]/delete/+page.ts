export async function load({ params }) {
  const expenseID = params.expenseID;
  return {
    expenseID,
  };
}
