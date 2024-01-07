<script lang="ts">
  import { PasswordInput } from "carbon-components-svelte";

  export let value = "";
</script>

<PasswordInput
  labelText="Password"
  bind:value
  name="password"
  {...$$restProps}
/>
