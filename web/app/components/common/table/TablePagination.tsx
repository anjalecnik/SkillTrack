import { useSearchParams } from "@remix-run/react";
import { Pagination as MuiPagination } from "@mui/material";
import { Flex } from "~/components/common";

interface TablePaginationProps {
  total: number;
  page: number;
  limit: number;
}

export const TablePagination = ({
  total,
  page,
  limit,
}: TablePaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnPageChange = (newPage: number) => {
    const modifiedParams = new URLSearchParams(searchParams);
    modifiedParams.set("page", newPage.toString());
    setSearchParams(modifiedParams);
  };

  const count = Math.ceil(total / limit);

  return (
    <Flex justifyContent="end" width="100%">
      <MuiPagination
        count={count}
        page={page}
        onChange={(_e, newPage) => handleOnPageChange(newPage)}
      />
    </Flex>
  );
};
