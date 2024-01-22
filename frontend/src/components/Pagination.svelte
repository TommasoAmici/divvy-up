<script lang="ts">
  import { goto } from "$app/navigation";
  import { page as pageStore } from "$app/stores";
  import { paginationFromURL } from "$lib/pagination";
  import { Pagination } from "carbon-components-svelte";

  export let totalItems: number;

  const pagination = paginationFromURL($pageStore.url);

  async function onChange(
    e: CustomEvent<{ page?: number; pageSize?: number }>
  ) {
    const { page, pageSize } = e.detail;
    const url = $pageStore.url.searchParams;
    url.set("page", (page ?? pagination.page).toString());
    url.set("size", (pageSize ?? pagination.size).toString());
    await goto(`?${url}`);
  }
</script>

<Pagination
  {totalItems}
  page={pagination.page}
  pageSize={pagination.size}
  pageSizes={[25, 50, 100]}
  on:change={onChange}
/>
