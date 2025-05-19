import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function AppBar(
  theme: Theme
): ComponentOverrideType<"MuiAppBar"> {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor:
            theme.palette.mode === "light" ? `#FFFFFF !important` : undefined,
          borderWidth: "1px 0",
        },
      },
    },
  };
}
