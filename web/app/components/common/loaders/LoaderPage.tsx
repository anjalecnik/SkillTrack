import { CircularProgress } from "@mui/material";
import { PageContainer } from "~/components/common";

export const LoaderPage = () => {
  return (
    <PageContainer justifyContent="center" alignItems="center">
      <CircularProgress />
    </PageContainer>
  );
};
