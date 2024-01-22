<script lang="ts">
  import { goto } from "$app/navigation";
  import ExpensesSummary from "$components/ExpensesSummary.svelte";
  import Modal from "$components/Modal.svelte";
  import { client } from "$lib/client";
  import { toasts } from "$lib/toast";

  const heading = "Settle up";

  export let data;
  $: groupID = data.groupID;
  $: cancelURL = `/groups/${groupID}`;

  async function onSubmit() {
    try {
      await client.settleAllExpenses(groupID);
      toasts.success("Expenses settled");
      await goto(cancelURL);
    } catch (error) {
      toasts.error("Failed to settle");
    }
  }
</script>

<Modal open {heading} {cancelURL} {onSubmit} primaryButton="Settle up">
  <ExpensesSummary data={data.expensesSummary} />
</Modal>
