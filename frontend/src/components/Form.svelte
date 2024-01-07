<script lang="ts">
  import { Form } from "carbon-components-svelte";
  export let onSubmit: (e: Event) => void;
</script>

<Form class="w-md" on:submit={onSubmit}><slot /></Form>
