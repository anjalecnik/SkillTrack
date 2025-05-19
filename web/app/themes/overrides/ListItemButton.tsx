import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function ListItemButton(
  theme: Theme
): ComponentOverrideType<"MuiListItemButton"> {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRight: `2px solid transparent`,
          "& .MuiListItemIcon-root": {
            marginRight: theme.spacing(1.25),
            color:
              theme.palette.mode === "light"
                ? theme.palette.grey[500]
                : undefined,
            "& .MuiSvgIcon-root": {
              width: "16px",
              height: "16px",
            },
          },
          "&.Mui-selected": {
            color: theme.palette.primary.main,
            borderRight: `2px solid ${theme.palette.primary.main}`,
            "& .MuiListItemIcon-root": {
              color: theme.palette.primary.main,
            },
          },
        },
      },
    },
  };
}
