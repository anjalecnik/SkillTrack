import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function Tooltip(
  theme: Theme
): ComponentOverrideType<"MuiTooltip"> {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.background.paper,
        },
      },
    },
  };
}
