<script lang="ts">
  import { goto } from "$app/navigation";
  import DateInput from "$components/DateInput.svelte";
  import Form from "$components/Form.svelte";
  import FormGroup from "$components/FormGroup.svelte";
  import Input from "$components/Input.svelte";
  import Modal from "$components/Modal.svelte";
  import NumberInput from "$components/NumberInput.svelte";
  import { client } from "$lib/client";
  import { toasts } from "$lib/toast";

  const heading = "Create a new expense";

  export let data;
  $: groupID = data.groupID;
  $: cancelURL = `/groups/${groupID}`;

  let description = "";
  let amount: number = 0;
  let date: string;

  async function onSubmit() {
    try {
      await client.createExpense(groupID, {
        description,
        amount,
        date: new Date(date).toISOString(),
      });
      toasts.success("Expense created");
      await goto(cancelURL);
    } catch (error) {
      toasts.error("Failed to create expense");
    }
  }
</script>

<Modal open {heading} {cancelURL} {onSubmit}>
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
