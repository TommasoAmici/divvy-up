<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$components/Button.svelte";
  import Form from "$components/Form.svelte";
  import FormGroup from "$components/FormGroup.svelte";
  import Input from "$components/Input.svelte";
  import PageTitle from "$components/PageTitle.svelte";
  import { client } from "$lib/client";
  import { toasts } from "$lib/toast";

  let name = "";

  async function onSubmit(e: Event) {
    e.preventDefault();
    try {
      const group = await client.addGroup(name);
      toasts.success("Successfully added group");
      await goto(`/groups/${group?.id}`);
    } catch (error) {
      toasts.error("Failed to add group");
    }
  }
</script>

<PageTitle>Add Group</PageTitle>
<Form {onSubmit}>
  <FormGroup>
    <Input bind:value={name} label="Name" name="group_name" />
  </FormGroup>
  <Button type="submit">Submit</Button>
</Form>
