import React, { useEffect } from "react";
import { useSearchParams } from "@remix-run/react";
import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  TableHeadCell,
  TableHeadCellProps,
  TablePagination,
  ListLoader,
  ListLoaderProps,
} from "~/components/common";
import { ITableMeta } from "~/types";
import { t } from "i18next";

interface PaginatedTableProps<T = object>
  extends Omit<ListLoaderProps, "count"> {
  headers: TableHeadCellProps[];
  items: T[] | null;
  meta?: ITableMeta;
  sortKey?: string;
  dataTestId?: string;
  /**
   * Wrapping component should be a TableRow
   */
  render: (item: T) => React.ReactNode;
  onSearchParamsChange?: (
    sort: { field: string; direction: "asc" | "desc"; raw: string } | null,
    page: string | null,
    searchParams: URLSearchParams
  ) => void;
}

export const PaginatedTable = <T,>({
  headers,
  items,
  render,
  isLoading,
  error,
  meta,
  sortKey,
  emptyMessage = t("common.noDataFound"),
  errorMessage,
  dataTestId,
  onSearchParamsChange,
}: PaginatedTableProps<T>) => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sort = searchParams.get("sort");
    const [field, dir] = sort?.split(":") ?? [];

    onSearchParamsChange?.(
      sort ? { field, direction: dir as "asc" | "desc", raw: sort } : null,
      searchParams.get("page"),
      searchParams
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const showPagination = meta && !!meta.total && !!meta.page;

  return (
    <TableContainer>
      <MuiTable
        sx={{ mb: showPagination ? "10px" : "0px" }}
        data-testid={dataTestId}
      >
        <TableHead>
          <TableRow>
            {headers.map(({ children, ...rest }, index) => (
              <TableHeadCell sortKey={sortKey} key={index} {...rest}>
                {children}
              </TableHeadCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>{items?.map((item) => render(item))}</TableBody>
      </MuiTable>

      <ListLoader
        isLoading={isLoading}
        error={error}
        count={items?.length ?? 0}
        emptyMessage={emptyMessage}
        errorMessage={errorMessage}
      />

      {showPagination && (
        <TablePagination
          total={meta.total as number}
          limit={meta.limit ?? 10}
          page={meta.page as number}
        />
      )}
    </TableContainer>
  );
};
