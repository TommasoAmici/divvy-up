<script lang="ts">
  import { client } from "$lib/client";
  import {
    Header,
    HeaderNavItem,
    HeaderUtilities,
  } from "carbon-components-svelte";
  import { onDestroy } from "svelte";
  import LogoutAction from "./LogoutAction.svelte";

  let authorized = false;
  const unsubscribe = client.authorized.subscribe(
    (value) => (authorized = value)
  );
  onDestroy(unsubscribe);
</script>

<Header platformName="Divvy">
  <HeaderUtilities>
    {#if authorized}
      <LogoutAction />
    {:else}
      <HeaderNavItem href="/login" text="Login" />
      <HeaderNavItem href="/signup" text="Sign up" />
    {/if}
  </HeaderUtilities>
</Header>
