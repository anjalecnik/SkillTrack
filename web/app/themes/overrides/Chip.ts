import { Theme } from "@mui/material";
import { ComponentOverrideType, ExtendedStyleProps } from "../types";
import { getColors } from "../utils";

function getColor({ color, theme }: ExtendedStyleProps) {
  const colors = getColors(theme, color);
  const { dark } = colors;

  return {
    "&.Mui-focusVisible": {
      outline: `2px solid ${dark}`,
      outlineOffset: 2,
    },
  };
}

function getColorStyle({ color, theme }: ExtendedStyleProps) {
  const colors = getColors(theme, color);
  const { light, lighter, main } = colors;

  return {
    color: main,
    backgroundColor: lighter,
    borderColor: light,
    "& .MuiChip-deleteIcon": {
      color: main,
      "&:hover": {
        color: light,
      },
    },
  };
}

export default function Chip(theme: Theme): ComponentOverrideType<"MuiChip"> & {
  MuiChip: {
    styleOverrides: { sizeLarge: unknown; light: unknown; combined: unknown };
  };
} {
  const defaultLightChip = getColorStyle({ color: "secondary", theme });
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          "&:active": {
            boxShadow: "none",
          },
          "&.MuiChip-colorPrimary": getColor({ color: "primary", theme }),
          "&.MuiChip-colorSecondary": getColor({ color: "secondary", theme }),
          "&.MuiChip-colorError": getColor({ color: "error", theme }),
          "&.MuiChip-colorInfo": getColor({ color: "info", theme }),
          "&.MuiChip-colorSuccess": getColor({ color: "success", theme }),
          "&.MuiChip-colorWarning": getColor({ color: "warning", theme }),
          [theme.breakpoints.up("xl")]: {
            fontSize: `1rem`,
          },
        },
        sizeLarge: {
          fontSize: "1rem",
          height: 40,
        },
        light: {
          ...defaultLightChip,
          "&.MuiChip-lightPrimary": getColorStyle({ color: "primary", theme }),
          "&.MuiChip-lightSecondary": getColorStyle({
            color: "secondary",
            theme,
          }),
          "&.MuiChip-lightError": getColorStyle({ color: "error", theme }),
          "&.MuiChip-lightInfo": getColorStyle({ color: "info", theme }),
          "&.MuiChip-lightSuccess": getColorStyle({ color: "success", theme }),
          "&.MuiChip-lightWarning": getColorStyle({ color: "warning", theme }),
        },
        combined: {
          border: "1px solid",
          ...defaultLightChip,
          "&.MuiChip-combinedPrimary": getColorStyle({
            color: "primary",
            theme,
          }),
          "&.MuiChip-combinedSecondary": getColorStyle({
            color: "secondary",
            theme,
          }),
          "&.MuiChip-combinedError": getColorStyle({ color: "error", theme }),
          "&.MuiChip-combinedInfo": getColorStyle({ color: "info", theme }),
          "&.MuiChip-combinedSuccess": getColorStyle({
            color: "success",
            theme,
          }),
          "&.MuiChip-combinedWarning": getColorStyle({
            color: "warning",
            theme,
          }),
        },
      },
    },
  };
}
