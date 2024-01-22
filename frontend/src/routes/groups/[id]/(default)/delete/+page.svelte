<script lang="ts">
  import { goto } from "$app/navigation";
  import Modal from "$components/Modal.svelte";
  import { client } from "$lib/client";
  import { toasts } from "$lib/toast";

  const heading = "Delete group";

  export let data;
  $: groupID = data.groupID;
  $: cancelURL = `/groups/${groupID}`;

  async function onSubmit() {
    try {
      await client.deleteGroup(groupID);
      toasts.success("Group deleted");
      await goto("/");
    } catch (error) {
      toasts.error("Failed to delete group");
    }
  }
</script>

<Modal open danger {heading} primaryButton="Delete" {cancelURL} {onSubmit}>
  <p>This is a permanent action and cannot be undone.</p>
</Modal>
