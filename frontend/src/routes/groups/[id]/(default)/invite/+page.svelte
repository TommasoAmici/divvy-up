<script lang="ts">
  import { goto } from "$app/navigation";
  import Form from "$components/Form.svelte";
  import FormGroup from "$components/FormGroup.svelte";
  import InlineNotification from "$components/InlineNotification.svelte";
  import Input from "$components/Input.svelte";
  import Modal from "$components/Modal.svelte";
  import { client } from "$lib/client";
  import { toasts } from "$lib/toast";

  const heading = "Add members to the group";

  export let data;
  $: groupID = data.groupID;
  $: cancelURL = `/groups/${groupID}`;

  let userID: string;
  let errorMessage: string;

  async function onSubmit() {
    try {
      await client.addUserToGroup(groupID, userID);
      toasts.success("Group member added");
      await goto(cancelURL);
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        errorMessage = error.message;
      }
      toasts.error("Failed to add group member");
    }
  }
</script>

<Modal open {heading} {cancelURL} primaryButton="Add" {onSubmit}>
  <p class="mb-4">
    Ask your friends to give you their User ID so you can add them to the group.
    You can find your User ID in the navigation menu.
  </p>

  {#if errorMessage}
    <InlineNotification message={errorMessage} />
  {/if}

  <Form>
    <FormGroup>
      <Input bind:value={userID} label="User ID" name="userID" />
    </FormGroup>
  </Form>
</Modal>
