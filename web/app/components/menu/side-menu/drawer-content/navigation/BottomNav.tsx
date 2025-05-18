import { Box } from "@mui/material";
import { useMenu } from "~/util";
import NavItem from "./NavItem";

export default function BottomNav() {
  const { bottomMenuItemsList, menuState } = useMenu();
  const drawerOpen = menuState.isMenuOpened;

  return (
    <Box
      sx={{
        pt: drawerOpen ? 2 : 0,
        display: "block",
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      {bottomMenuItemsList.map((item) => (
        <NavItem item={item} level={1} key={item.id} />
      ))}
    </Box>
  );
}
