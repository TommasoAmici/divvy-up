<script lang="ts">
  import { DataTable, Tag, type DataTableHeader } from "$components";
  import type { Importer } from "$lib/importer";

  export let selectedRowIds: string[];
  export let importer: Importer | undefined;
  export let dateColumn: string | undefined;
  export let dateFormat: string | undefined;
  export let descriptionColumn: string | undefined;
  export let amountColumn: string | undefined;

  let headers: DataTableHeader[] | undefined;

  function amountDisplay(value: number) {
    return value.toFixed(2);
  }

  $: headers = importer?.headers.map((h) => ({
    key: h,
    value: h,
  }));
  $: rows = importer?.preview({ dateColumn, dateFormat, amountColumn });

  $: isSelectedColumn = (key: string) => {
    return (
      key === dateColumn || key === amountColumn || key === descriptionColumn
    );
  };
</script>

{#if importer}
  <DataTable
    class="overflow-x-scroll import-preview"
    zebra
    batchSelection
    selectable
    bind:selectedRowIds
    {headers}
    {rows}
  >
    <svelte:fragment slot="cell-header" let:header>
      {#if isSelectedColumn(header.key)}
        <Tag class="font-bold whitespace-nowrap" type="high-contrast">
          {header.value}
        </Tag>
      {:else}
        {header.value}
      {/if}
    </svelte:fragment>

    <svelte:fragment slot="cell" let:row let:cell>
      {#if cell.key === amountColumn}
        <strong class="block w-full text-right">
          {amountDisplay(cell.value)}
        </strong>
      {:else if isSelectedColumn(cell.key)}
        <strong>
          {cell.display ? cell.display(cell.value, row) : cell.value}
        </strong>
      {:else}
        <div class="truncate max-w-32">{cell.value}</div>
      {/if}
    </svelte:fragment>
  </DataTable>
{:else}
  <p>No data to preview</p>
{/if}

<style>
  :global(.import-preview .bx--table-column-checkbox) {
    display: grid;
    place-content: center;
    padding: 0px !important;
    width: 48px !important;
    height: 50px;
  }
</style>
