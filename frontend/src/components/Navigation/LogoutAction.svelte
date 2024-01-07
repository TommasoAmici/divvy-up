<script lang="ts">
  import { goto } from "$app/navigation";
  import { client } from "$lib/client";
  import { HeaderGlobalAction } from "carbon-components-svelte";
  import Logout from "carbon-icons-svelte/lib/Logout.svelte";

  async function onClick() {
    await client.logout();
    goto("/login");
  }
</script>

<HeaderGlobalAction aria-label="Logout" icon={Logout} on:click={onClick} />
