import { useSearchParams } from "@remix-run/react";
import { PaginatedResponse } from "~/types";

export function useGoBackToPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  /** if deleting last available item on second page, this handles redirect to first page since there is no more page 2 */
  function goBackToPage(
    paginatedResponse?: PaginatedResponse<object> | null,
    page: number = 1
  ) {
    const { data, meta } = paginatedResponse || {};
    if (!data) return;
    if (!data?.length && meta?.page !== 1) {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    }
  }

  return goBackToPage;
}
