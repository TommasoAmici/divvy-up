<script lang="ts">
  import Button from "$components/Button.svelte";
  import ExpensesSummary from "$components/ExpensesSummary.svelte";
  import ExpensesTable from "$components/ExpensesTable.svelte";
  import Tile from "$components/Tile.svelte";

  export let data;
  $: groupID = data.groupID;
  $: createURL = `/groups/${groupID}/expenses/create`;
  $: importCsvURL = `/groups/${groupID}/expenses/import`;
  $: settleURL = `/groups/${groupID}/expenses/settle`;
  $: expenses = data.expenses;
  let selectedRowIds: string[] = [];

  $: disableEdit = selectedRowIds.length !== 1;
  $: editURL =
    !disableEdit && `/groups/${groupID}/expenses/${selectedRowIds[0]}`;

  $: disableDelete = selectedRowIds.length !== 1;
  $: deleteURL =
    !disableDelete && `/groups/${groupID}/expenses/${selectedRowIds[0]}/delete`;
</script>

<Tile class="mb-4">
  <h3 class="mb-4">Unsettled expenses</h3>
  <ExpensesSummary data={data.expensesSummary} />
</Tile>

<div class="w-full flex justify-between mb-2">
  <div>
    <Button kind="danger-tertiary" href={deleteURL} disabled={disableDelete}>
      Delete
    </Button>
    <Button kind="secondary" href={editURL} disabled={disableEdit}>Edit</Button>
    <Button href={createURL}>Add</Button>
    <Button kind="tertiary" href={importCsvURL}>Import</Button>
  </div>
  <Button href={settleURL}>Settle</Button>
</div>

<ExpensesTable data={expenses} bind:selectedRowIds />

<slot />
