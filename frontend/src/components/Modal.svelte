<script lang="ts">
  import { goto } from "$app/navigation";
  import { Modal } from "carbon-components-svelte";

  export let open: boolean;
  export let danger: boolean = false;
  export let heading: string;
  export let primaryButton = "Create";
  export let cancelURL: string;
  export let hasScrollingContent: boolean = false;

  export let onSubmit: () => void;

  function onCancel() {
    goto(cancelURL);
  }
</script>

<Modal
  bind:open
  bind:danger
  bind:hasScrollingContent
  modalHeading={heading}
  primaryButtonText={primaryButton}
  secondaryButtonText="Cancel"
  on:click:button--secondary={onCancel}
  on:submit={onSubmit}
  on:close={onCancel}
>
  <slot />
</Modal>
