import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function TableFooter(
  theme: Theme
): ComponentOverrideType<"MuiTableFooter"> {
  return {
    MuiTableFooter: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[50],
          borderTop: `2px solid ${theme.palette.divider}`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    },
  };
}
