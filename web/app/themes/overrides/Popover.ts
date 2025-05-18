import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function Popover(
  theme: Theme
): ComponentOverrideType<"MuiPopover"> {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z1,
        },
      },
    },
  };
}
