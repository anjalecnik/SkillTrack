import { Box } from "@mui/material";
import NavItem from "./NavItem";
import { useMenu } from "~/util";

export default function Navigation() {
  const { menuState, menuItemsList } = useMenu();

  const navGroups = menuItemsList.map((item) => {
    return <NavItem key={item.id} item={item} level={1} />;
  });

  return (
    <Box
      sx={{
        pt: menuState.isMenuOpened ? 2 : 0,
        display: "block",
      }}
    >
      {navGroups}
    </Box>
  );
}
