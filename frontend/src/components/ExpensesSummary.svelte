<script lang="ts">
  import { type ExpenseSummary } from "$lib/client";
  import { settleExpenses } from "$lib/settle";

  export let data: ExpenseSummary[];

  $: userIDtoName = Object.fromEntries(
    data.map((e) => [e.paid_by, e.expand?.paid_by?.name ?? e.paid_by])
  );
  $: transactions = settleExpenses(data);
</script>

{#each transactions as transaction}
  {userIDtoName[transaction.payer]} owes {transaction.amount.toFixed(2)} to {userIDtoName[
    transaction.payee
  ]}
{:else}
  All expenses are settled
{/each}
