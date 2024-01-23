<script lang="ts">
  import { client, type Group } from "$lib/client";
  import { toasts } from "$lib/toast";
  import {
    Header,
    HeaderAction,
    HeaderNavItem,
    HeaderPanelLink,
    HeaderPanelLinks,
    HeaderUtilities,
    SideNav,
  } from "carbon-components-svelte";
  import { UserAvatarFilledAlt } from "carbon-icons-svelte";
  import { onDestroy } from "svelte";
  import Groups from "./Groups.svelte";
  import LogoutAction from "./LogoutAction.svelte";

  let authorized = false;
  const unsubscribe = client.authorized.subscribe(
    (value) => (authorized = value)
  );
  onDestroy(unsubscribe);

  export let groups: Group[] | undefined;
  let isSideNavOpen = true;
  let userMenuOpen = false;

  async function copyUserID() {
    try {
      await navigator.clipboard.writeText(client.userID);
      toasts.info("User ID copied");
    } catch (error) {
      toasts.error("Failed to copy User ID");
    }
  }
</script>

<Header platformName="DivvyUp" bind:isSideNavOpen>
  <HeaderUtilities>
    {#if authorized}
      <HeaderAction
        bind:isOpen={userMenuOpen}
        icon={UserAvatarFilledAlt}
        closeIcon={UserAvatarFilledAlt}
      >
        <HeaderPanelLinks>
          <HeaderPanelLink on:click={copyUserID}>
            User ID: {client.userID}
          </HeaderPanelLink>
        </HeaderPanelLinks>
      </HeaderAction>
      <LogoutAction />
    {:else}
      <HeaderNavItem href="/login" text="Login" />
      <HeaderNavItem href="/signup" text="Sign up" />
    {/if}
  </HeaderUtilities>
</Header>

<SideNav isOpen={isSideNavOpen}>
  <Groups {groups} />
</SideNav>
