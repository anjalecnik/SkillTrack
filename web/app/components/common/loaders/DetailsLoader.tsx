import React from "react";
import { CircularProgress, Typography, useTheme } from "@mui/material";
import { Flex } from "~/components/common";

export interface DetailsLoaderProps {
  isLoading?: boolean;
  error?: Error | null;
  errorMessage?: string;
  /** This is rendered if isLoading and error are falsy */
  override?: React.ReactNode;
}

const Centered = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex justifyContent="center" alignItems="center" width="100%" p="24px">
      {children}
    </Flex>
  );
};

export const DetailsLoader = ({
  isLoading,
  error,
  errorMessage,
  override,
}: DetailsLoaderProps) => {
  const theme = useTheme();
  if (error) {
    return (
      <Centered>
        <Typography
          sx={{
            color: theme.palette.customColors.red.main,
          }}
        >
          {errorMessage ?? error.message}
        </Typography>
      </Centered>
    );
  }

  if (isLoading) {
    return (
      <Centered>
        <CircularProgress />
      </Centered>
    );
  }

  if (override) {
    return <Centered>{override}</Centered>;
  }

  return null;
};
