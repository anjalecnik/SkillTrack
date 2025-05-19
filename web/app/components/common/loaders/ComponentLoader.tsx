import { Box, CircularProgress } from "@mui/material";
import { Flex } from "~/components/common";

interface ComponentLoaderProps {
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const ComponentLoader = ({
  isLoading,
  children,
}: ComponentLoaderProps) => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {isLoading && (
        <Flex
          justifyContent="center"
          alignItems="center"
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: 999,
            backgroundColor: "rgba(110, 110, 110, 0.5)",
          }}
        >
          <CircularProgress />
        </Flex>
      )}
      {children}
    </Box>
  );
};
