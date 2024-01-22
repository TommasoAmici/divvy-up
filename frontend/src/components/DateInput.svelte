<script lang="ts">
  import { DatePicker, DatePickerInput } from "carbon-components-svelte";

  export let value = new Date().toISOString();
  export let label = "Date";
</script>

<DatePicker bind:value datePickerType="single" dateFormat="Y-m-d">
  <DatePickerInput class="w-full" labelText={label} />
</DatePicker>
