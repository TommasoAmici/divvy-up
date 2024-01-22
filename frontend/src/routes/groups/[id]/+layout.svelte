<script lang="ts">
  import GroupMenu from "$components/GroupMenu.svelte";
  import { client } from "$lib/client";

  export let data;
  $: groupID = data.groupID;
  $: groupName = data.group.name;
  $: isGroupOwner = data.group.owner === client.userID;
</script>

<section class="flex items-center gap-4 mb-4">
  <h1>{groupName}</h1>
  {#if isGroupOwner}
    <GroupMenu {groupID} />
  {/if}
</section>

<slot />
