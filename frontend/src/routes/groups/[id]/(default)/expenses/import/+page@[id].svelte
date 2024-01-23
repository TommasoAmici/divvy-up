<script lang="ts">
  import { goto } from "$app/navigation";
  import { ProgressBar } from "$components";
  import Button from "$components/Button.svelte";
  import Combobox from "$components/Combobox.svelte";
  import FileInput from "$components/FileInput.svelte";
  import Form from "$components/Form.svelte";
  import FormGroup from "$components/FormGroup.svelte";
  import Input from "$components/Input.svelte";
  import { client } from "$lib/client";
  import { Importer } from "$lib/importer";
  import { toasts } from "$lib/toast";
  import ImportPreview from "./ImportPreview.svelte";

  const heading = "Import expenses";

  export let data;
  $: groupID = data.groupID;
  $: cancelURL = `/groups/${groupID}`;

  let importer: Importer | undefined;
  $: items = importer?.headers.map((h) => ({ id: h, text: h })) ?? [];

  let dateColumn: string | undefined = data.importSettings?.settings.dateColumn;
  let dateFormat: string | undefined = data.importSettings?.settings.dateFormat;
  let descriptionColumn: string | undefined =
    data.importSettings?.settings.descriptionColumn;
  let amountColumn: string | undefined =
    data.importSettings?.settings.amountColumn;

  let uploading = false;

  let selectedRowIds: string[] = [];

  $: importDisabled =
    uploading || selectedRowIds.length === 0 || amountColumn === undefined;

  async function onSubmit() {
    if (!importer) {
      toasts.warning("You need to load a file before you can import expenses");
      return;
    }
    if (selectedRowIds.length === 0) {
      toasts.warning("You need to select the expenses to import");
      return;
    }

    try {
      uploading = true;

      try {
        void client.updateImporterSettings({
          dateColumn,
          descriptionColumn,
          dateFormat,
          amountColumn,
        });
      } catch (error) {
        console.error(error);
      }

      await client.importExpenses(
        groupID,
        importer?.expensesForImport({
          selectedRowIds,
          dateColumn,
          descriptionColumn,
          dateFormat,
          amountColumn,
        })
      );
      toasts.success("Expenses imported");
      uploading = false;
      await goto(cancelURL);
    } catch (error) {
      uploading = false;
      toasts.error("Failed to import expenses");
    }
  }

  async function onChange(e: CustomEvent<readonly File[]>) {
    const _importer = new Importer(e.detail[0]);
    await _importer.parse();
    importer = _importer;
  }
</script>

<h2 class="mb-4">{heading}</h2>

<Form>
  <FormGroup>
    <FileInput {onChange} />
  </FormGroup>

  {#if importer}
    <p class="mb-4">Select which columns contain the data you want to import</p>
    <FormGroup>
      <Combobox
        bind:selected={descriptionColumn}
        label="Description"
        required
        {items}
      />
    </FormGroup>
    <FormGroup>
      <Combobox bind:selected={amountColumn} label="Amount" required {items} />
    </FormGroup>
    <FormGroup>
      <Combobox bind:selected={dateColumn} label="Date" {items} />
    </FormGroup>
    <FormGroup>
      <Input
        bind:value={dateFormat}
        placeholder="YYYY-MM-DD"
        label="Date format"
        help="If the date is not parsed correctly, please manually provide the format"
      />
    </FormGroup>
  {/if}
</Form>
<ImportPreview
  {importer}
  {dateColumn}
  {dateFormat}
  {descriptionColumn}
  {amountColumn}
  bind:selectedRowIds
/>

<ProgressBar hidden={!uploading} helperText="Uploading expenses..." />

{#if importer}
  <div class="mt-4 flex justify-end">
    <Button onClick={onSubmit} disabled={importDisabled}>Import</Button>
  </div>
{/if}
