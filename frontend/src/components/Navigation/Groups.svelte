<script lang="ts">
  import { client, type Group } from "$lib/client";
  import { SideNavMenu, SideNavMenuItem } from "carbon-components-svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import { onDestroy } from "svelte";

  export let groups: Group[] | undefined;

  let authorized = false;
  const unsubscribeAuth = client.authorized.subscribe(
    (value) => (authorized = value)
  );
  onDestroy(unsubscribeAuth);
</script>

{#if authorized}
  <SideNavMenu text="Groups" expanded={true}>
    {#if groups !== undefined}
      {#each groups as group}
        <SideNavMenuItem href={`/groups/${group.id}`}>
          {group.name}
        </SideNavMenuItem>
      {/each}
    {/if}
    <SideNavMenuItem href="/groups/add">
      <div class="flex items-center justify-between">
        <span class="mr-2">Add</span>
        <Add aria-hidden={true} />
      </div>
    </SideNavMenuItem>
  </SideNavMenu>
{/if}
