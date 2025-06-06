import { Theme } from "@mui/material";
import { ComponentOverrideType, ExtendedStyleProps } from "../types";
import { getColors } from "../utils";

function getColorStyle({ color, theme }: ExtendedStyleProps) {
  const colors = getColors(theme, color);
  const { lighter, main } = colors;

  return {
    borderColor: "transparent",
    backgroundColor: lighter,
    "& .MuiAlert-icon": {
      color: main,
    },
  };
}

export default function Alert(
  theme: Theme
): ComponentOverrideType<"MuiAlert"> & {
  MuiAlert: { styleOverrides: { border: unknown } };
} {
  const primaryDashed = getColorStyle({ color: "primary", theme });

  return {
    MuiAlert: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          fontSize: "0.875rem",
        },
        icon: {
          fontSize: "1rem",
        },
        message: {
          padding: 0,
          marginTop: 3,
        },
        filled: {
          color: theme.palette.grey[0],
        },
        border: {
          padding: "10px 16px",
          border: "1px solid",
          ...primaryDashed,
          "&.MuiAlert-borderPrimary": getColorStyle({
            color: "primary",
            theme,
          }),
          "&.MuiAlert-borderSecondary": getColorStyle({
            color: "secondary",
            theme,
          }),
          "&.MuiAlert-borderError": getColorStyle({ color: "error", theme }),
          "&.MuiAlert-borderSuccess": getColorStyle({
            color: "success",
            theme,
          }),
          "&.MuiAlert-borderInfo": getColorStyle({ color: "info", theme }),
          "&.MuiAlert-borderWarning": getColorStyle({
            color: "warning",
            theme,
          }),
        },
        action: {
          "& .MuiButton-root": {
            padding: 2,
            height: "auto",
            fontSize: "0.75rem",
            marginTop: -2,
          },
          "& .MuiIconButton-root": {
            width: "auto",
            height: "auto",
            padding: 2,
            marginRight: 6,
            "& .MuiSvgIcon-root": {
              fontSize: "1rem",
            },
          },
        },
      },
    },
  };
}
