import { Box, Breadcrumbs } from "@mui/material";
import { MainDrawer, Header } from "~/components/menu";
import { Flex, FlexColumn } from "~/components/common";
import { HEADER_HEIGHT } from "~/constants";

interface ILayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: ILayoutProps) {
  return (
    <Flex>
      <MainDrawer />
      <FlexColumn width="100%">
        <Header />
        <Box
          component="main"
          sx={{
            display: "flex",
            width: "100%",
            flexGrow: 1,
            marginTop: `${HEADER_HEIGHT}px`,
          }}
        >
          <Box
            sx={{
              padding: "20px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Breadcrumbs />
            {children}
          </Box>
        </Box>
      </FlexColumn>
    </Flex>
  );
}
