import { Typography } from "@mui/material";
import { Flex, DetailsLoader } from "~/components/common";

export interface ListLoaderProps {
  isLoading?: boolean;
  error?: Error | null;
  errorMessage?: string;
  count?: number | null;
  emptyMessage?: React.ReactNode | string;
}

export const ListLoader = ({
  isLoading,
  error,
  errorMessage,
  count,
  emptyMessage,
}: ListLoaderProps) => {
  if (error || isLoading) {
    return (
      <DetailsLoader
        error={error}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    );
  }

  if (count === 0 && emptyMessage) {
    return (
      <Flex justifyContent="center" alignItems="center" width="100%" p="24px">
        {typeof emptyMessage === "string" ? (
          <Typography>{emptyMessage}</Typography>
        ) : (
          emptyMessage
        )}
      </Flex>
    );
  }

  return null;
};
