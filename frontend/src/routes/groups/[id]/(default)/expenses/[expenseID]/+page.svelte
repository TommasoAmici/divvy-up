<script lang="ts">
  import { goto } from "$app/navigation";
  import DateInput from "$components/DateInput.svelte";
  import Form from "$components/Form.svelte";
  import FormGroup from "$components/FormGroup.svelte";
  import Input from "$components/Input.svelte";
  import Modal from "$components/Modal.svelte";
  import NumberInput from "$components/NumberInput.svelte";
  import { client } from "$lib/client.js";
  import { toasts } from "$lib/toast.js";

  export let data;

  const heading = "Update expense";
  $: cancelURL = `/groups/${data.groupID}`;

  let description = data.expenseDetails.description;
  let amount = data.expenseDetails.amount;
  let date = data.expenseDetails.date;

  async function onSubmit() {
    try {
      await client.updateExpense(data.groupID, data.expenseID, {
        description,
        amount,
        date,
      });
      toasts.success("Expense updated");
      await goto(cancelURL);
    } catch (error) {
      toasts.error("Failed to update expense");
    }
  }
</script>

<Modal open {heading} {cancelURL} {onSubmit} primaryButton="Update">
  <Form>
    <FormGroup>
      <Input bind:value={description} label="Description" name="description" />
    </FormGroup>
    <FormGroup>
      <NumberInput bind:value={amount} label="Amount" name="amount" min={0} />
    </FormGroup>
    <FormGroup>
      <DateInput bind:value={date} />
    </FormGroup>
  </Form>
</Modal>
