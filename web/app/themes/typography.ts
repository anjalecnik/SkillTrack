import { Theme, TypographyVariantsOptions } from "@mui/material";
import { FontFamily, ThemeMode } from "./types";

export const Typography = (
  _mode: ThemeMode,
  fontFamily: FontFamily,
  _theme: Theme
): TypographyVariantsOptions => ({
  htmlFontSize: 16,
  fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  // Large Heading 38
  h1: {
    fontWeight: 700,
    fontSize: "2.375rem",
    lineHeight: 1.21,
    [_theme.breakpoints.up("xl")]: {
      fontSize: `calc(2.375rem + 0.3rem)`,
      lineHeight: `calc(1.21 + 0.3)`,
    },
  },
  // Large heading 30
  h2: {
    fontWeight: 700,
    fontSize: "1.875rem",
    lineHeight: 1.27,
    [_theme.breakpoints.up("xl")]: {
      fontSize: `calc(1.875rem + 0.3rem)`,
      lineHeight: `calc(1.21 + 0.3)`,
    },
  },
  // Heading 24
  h3: {
    fontWeight: 700,
    fontSize: "1.5rem",
    lineHeight: 1.33,
    [_theme.breakpoints.up("xl")]: {
      fontSize: `calc(1.5rem + 0.3rem)`,
      lineHeight: `calc(1.33 + 0.3)`,
    },
  },
  // Heading 20
  h4: {
    fontWeight: 700,
    fontSize: "1.25rem",
    lineHeight: 1.4,
    [_theme.breakpoints.up("xl")]: {
      fontSize: `calc(1.25rem + 0.3rem)`,
      lineHeight: `calc(1.4 + 0.3)`,
    },
  },
  h5: {
    fontWeight: 700,
    fontSize: "1rem",
    lineHeight: 1.5,
    [_theme.breakpoints.up("xl")]: {
      fontSize: `calc(1rem + 0.3rem)`,
      lineHeight: `calc(1.5 + 0.3)`,
    },
  },
  h6: {
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: 1.57,
    [_theme.breakpoints.up("xl")]: {
      fontSize: `calc(0.875rem + 0.3rem)`,
      lineHeight: `calc(1.57 + 0.3)`,
    },
  },
  caption: {
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    [_theme.breakpoints.up("xl")]: {
      fontSize: `calc(0.75rem + 0.3rem)`,
      lineHeight: `calc(1.66 + 0.3)`,
    },
  },
  // Body 14
  body1: {
    fontSize: "0.875rem",
    lineHeight: 1.57,
    [_theme.breakpoints.up("xl")]: {
      fontSize: `calc(0.875rem + 0.3rem)`,
    },
  },
  // Body 12
  body2: {
    fontSize: "0.75rem",
    lineHeight: 1.66,
    [_theme.breakpoints.up("xl")]: {
      fontSize: `calc(0.75rem + 0.3rem)`,
    },
  },
  // Subheading 16
  subtitle1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    [_theme.breakpoints.up("xl")]: {
      fontSize: `calc(1rem + 0.3rem)`,
      lineHeight: `calc(1.5 + 0.3)`,
    },
  },
  subtitle2: {
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: 1.66,
    [_theme.breakpoints.up("xl")]: {
      fontSize: `calc(0.75rem + 0.3rem)`,
      lineHeight: `calc(1.66 + 0.3)`,
    },
  },
  overline: {
    lineHeight: 1.66,
    [_theme.breakpoints.up("xl")]: {
      lineHeight: `calc(1.66 + 0.3)`,
    },
  },
  button: {
    textTransform: "capitalize",
    [_theme.breakpoints.up("xl")]: {
      fontSize: `1rem`,
      lineHeight: `2rem`,
    },
  },
});
