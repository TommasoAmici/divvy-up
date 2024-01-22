export type Pagination = {
  page: number;
  size: number;
};

const DEFAULT_PAGE = "1";
const DEFAULT_PAGE_SIZE = "25";

export function paginationFromURL(url: URL) {
  const page = parseInt(url.searchParams.get("page") ?? DEFAULT_PAGE);
  const size = parseInt(url.searchParams.get("size") ?? DEFAULT_PAGE_SIZE);
  return { page, size };
}
