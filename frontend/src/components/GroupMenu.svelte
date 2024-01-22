<script lang="ts">
  import { OverflowMenu, OverflowMenuItem } from "carbon-components-svelte";
  import Settings from "carbon-icons-svelte/lib/Settings.svelte";

  export let groupID: string;
  $: inviteURL = `/groups/${groupID}/invite`;
  $: deleteURL = `/groups/${groupID}/delete`;
</script>

<OverflowMenu icon={Settings}>
  <OverflowMenuItem text="Invite members" href={inviteURL} />
  <OverflowMenuItem danger text="Delete group" href={deleteURL} />
</OverflowMenu>
