import { useMemo } from "react";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import DrawerHeader from "./drawer-header";
import DrawerContent from "./drawer-content";
import MiniDrawerStyled from "./MiniDrawerStyled";
import { DRAWER_WIDTH } from "~/constants";
import { useMenu } from "~/util";

interface Props {
  window?: () => Window;
}

export function MainDrawer({ window }: Props) {
  const theme = useTheme();
  const { menuState, handlerDrawerOpen } = useMenu();
  const drawerOpen = menuState.isMenuOpened;
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(
    () => <DrawerHeader open={drawerOpen} />,
    [drawerOpen]
  );

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, zIndex: 1200 }}
      aria-label="mailbox folders"
    >
      {!matchDownMD ? (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          {/* {drawerHeader} */}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={() => handlerDrawerOpen(!drawerOpen)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: "none",
              boxShadow: "inherit",
            },
          }}
        >
          {/* {drawerHeader} */}
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}
