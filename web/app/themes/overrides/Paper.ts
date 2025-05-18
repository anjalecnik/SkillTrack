import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function Paper(theme: Theme): ComponentOverrideType<"MuiPaper"> {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: `${theme.palette.background.paper}`,
          border:
            theme.palette.mode === "light"
              ? `1px solid ${theme.palette.grey[200]}`
              : "none",
        },
      },
    },
  };
}
