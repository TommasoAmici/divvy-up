<script lang="ts">
  import { type Group } from "$lib/client";
  import { SideNavMenu, SideNavMenuItem } from "carbon-components-svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";

  export let groups: Group[];
</script>

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
