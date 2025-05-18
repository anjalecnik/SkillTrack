import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function ListItemIcon(
  theme: Theme
): ComponentOverrideType<"MuiListItemIcon"> {
  return {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 24,
          color: theme.palette.text.primary,
        },
      },
    },
  };
}
