<script lang="ts">
  import { TextInput } from "carbon-components-svelte";

  export let value = "";
  export let label: string;
</script>

<TextInput labelText={label} bind:value {...$$restProps} />
