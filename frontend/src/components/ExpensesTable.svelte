<script lang="ts">
  import type { DataTableHeader } from "$components";
  import { DataTable } from "$components";
  import type { Expense } from "$lib/client";
  import Pagination from "./Pagination.svelte";

  export let selectedRowIds: string[];
  export let data: { items: Expense[]; totalItems: number };
  $: rows = data.items;
  $: totalItems = data.totalItems;

  const headers: DataTableHeader[] = [
    { key: "description", value: "Description" },
    { key: "expand.paid_by.name", value: "Paid by" },
    {
      key: "amount",
      value: "Amount",
      display: (value) => value.toFixed(2),
    },
    {
      key: "date",
      value: "Date",
      display: (value) => {
        return new Date(value).toDateString();
      },
    },
    {
      key: "settled_at",
      value: "Settled",
      display: (value) => {
        if (value) {
          return new Date(value).toDateString();
        } else {
          return "";
        }
      },
    },
  ];
</script>

<DataTable zebra {headers} {rows} radio bind:selectedRowIds />

<Pagination {totalItems} />
