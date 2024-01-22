<script lang="ts">
  import { goto } from "$app/navigation";
  import Modal from "$components/Modal.svelte";
  import { client } from "$lib/client";
  import { toasts } from "$lib/toast";

  const heading = "Delete expense";

  export let data;
  $: groupID = data.groupID;
  $: expenseID = data.expenseID;
  $: cancelURL = `/groups/${data.groupID}`;

  async function onSubmit() {
    try {
      await client.deleteExpense(groupID, expenseID);
      toasts.success("Expense deleted");
      await goto(cancelURL);
    } catch (error) {
      toasts.error("Failed to delete expense");
    }
  }
</script>

<Modal open danger {heading} primaryButton="Delete" {cancelURL} {onSubmit}>
  <p>This is a permanent action and cannot be undone.</p>
</Modal>
