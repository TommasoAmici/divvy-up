<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { Navigation } from "$components/Navigation";
  import Toasts from "$components/Toasts.svelte";
  import { client } from "$lib/client";
  import { Content, Loading, SkipToContent } from "carbon-components-svelte";
  import "carbon-components-svelte/css/white.css";
  import { onDestroy } from "svelte";
  import "uno.css";

  export let data;
  $: groups = data.groups;

  let initialized = false;
  const unsubscribeInit = client.initialized.subscribe(
    (value) => (initialized = value)
  );
  onDestroy(unsubscribeInit);

  let authorized = false;
  const unsubscribeAuth = client.authorized.subscribe(
    (value) => (authorized = value)
  );
  onDestroy(unsubscribeAuth);

  const unauthorizedPaths: Record<string, boolean> = {
    "/login": true,
    "/signup": true,
  };

  if (browser && !authorized && !unauthorizedPaths[$page.route.id ?? ""]) {
    goto("/login");
  }
</script>

<SkipToContent />

<Navigation {groups} />

{#if !initialized}
  <Loading />
{:else}
  <Content>
    <slot />
  </Content>
{/if}

<Toasts />
