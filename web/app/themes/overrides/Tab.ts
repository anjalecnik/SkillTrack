import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function Tab(theme: Theme): ComponentOverrideType<"MuiTab"> {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 46,
          color: theme.palette.text.primary,
          borderRadius: 4,
          opacity: 1,
          // color: theme.palette.grey[900],
          "&:hover": {
            color: theme.palette.primary.main,

            "& .MuiSvgIcon-root": {
              color: theme.palette.primary.main,
            },
          },
          "&:focus-visible": {
            borderRadius: 4,
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: -3,
          },
          "&.active": {
            color: theme.palette.primary.main,
            opacity: 1,

            "& .MuiSvgIcon-root": {
              color: theme.palette.primary.main,
            },
          },
          "& .MuiSvgIcon-root": {
            width: "18px",
            height: "18px",
            color: theme.palette.grey[500],
          },
        },
      },
    },
  };
}
