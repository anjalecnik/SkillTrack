import { alpha, Theme } from "@mui/material";
import {
  ButtonVariantProps,
  ComponentOverrideType,
  ExtendedStyleProps,
} from "../types";
import { getColors, getShadow } from "../utils";

interface ButtonStyleProps extends ExtendedStyleProps {
  variant: ButtonVariantProps;
}

function getColorStyle({ variant, color, theme }: ButtonStyleProps) {
  const colors = getColors(theme, color);
  const { darker, light, lighter, main, dark, contrastText } = colors;

  const buttonShadow = `${color as string}Button`;
  const shadows = getShadow(theme, buttonShadow);

  const commonShadow = {
    "&::after": {
      boxShadow: `0 0 5px 5px ${alpha(main, 0.9)}`,
    },
    "&:active::after": {
      boxShadow: `0 0 0 0 ${alpha(main, 0.9)}`,
    },
    "&:focus-visible": {
      outline: `2px solid ${dark}`,
      outlineOffset: 2,
    },
  };

  switch (variant) {
    case "contained":
      return {
        "&:hover": {
          backgroundColor: light,
        },
        "&:focus": {
          backgroundColor: darker,
        },
      };
    case "shadow":
      return {
        color: contrastText,
        backgroundColor: main,
        boxShadow: shadows,
        "&:hover": {
          boxShadow: "none",
          backgroundColor: dark,
        },
        ...commonShadow,
      };
    case "outlined":
      return {
        borderColor: "#D9D9D9",
        color: "#262626",
        backgroundColor: "#FFFFFF",
        "&:hover": {
          color: main,
          backgroundColor: "transparent",
          borderColor: light,
        },
        "&:focus": {
          borderColor: darker,
          color: darker,
        },
      };
    case "dashed":
      return {
        color: main,
        borderColor: main,
        backgroundColor:
          theme.palette.mode === "light" ? lighter : theme.palette.grey[900],
        "&:hover": {
          color: dark,
          borderColor: dark,
        },
        ...commonShadow,
      };
    case "text":
    default:
      return {
        "&:hover": {
          color: dark,
          backgroundColor: theme.palette.mode === "light" ? lighter : undefined,
        },
        ...commonShadow,
      };
  }
}

export default function Button(
  theme: Theme
): ComponentOverrideType<"MuiButton"> & {
  MuiButton: {
    styleOverrides: {
      dashed: unknown;
      shadow: unknown;
      sizeExtraSmall: unknown;
    };
  };
} {
  const primaryDashed = getColorStyle({
    variant: "dashed",
    color: "primary",
    theme,
  });
  const primaryShadow = getColorStyle({
    variant: "shadow",
    color: "primary",
    theme,
  });

  const disabledStyle = {
    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.grey[500],
      cursor: "not-allowed", // This won't work, because pointer-events is set to none, but whatever
    },
  };
  const iconStyle = {
    "&>*:nth-of-type(1)": {
      fontSize: "inherit",
    },
  };

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontWeight: 400,
          minHeight: "40px",
          "&::after": {
            content: '""',
            display: "block",
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            borderRadius: 4,
            opacity: 0,
            transition: "all 0.5s",
          },

          "&:active::after": {
            position: "absolute",
            borderRadius: 4,
            left: 0,
            top: 0,
            opacity: 1,
            transition: "0s",
          },
        },
        contained: {
          ...disabledStyle,
        },
        outlined: {
          ...disabledStyle,
        },
        text: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        endIcon: {
          ...iconStyle,
        },
        startIcon: {
          ...iconStyle,
        },
        dashed: {
          border: "1px dashed",
          ...primaryDashed,
          "&.MuiButton-dashedPrimary": getColorStyle({
            variant: "dashed",
            color: "primary",
            theme,
          }),
          "&.MuiButton-dashedSecondary": getColorStyle({
            variant: "dashed",
            color: "secondary",
            theme,
          }),
          "&.MuiButton-dashedError": getColorStyle({
            variant: "dashed",
            color: "error",
            theme,
          }),
          "&.MuiButton-dashedSuccess": getColorStyle({
            variant: "dashed",
            color: "success",
            theme,
          }),
          "&.MuiButton-dashedInfo": getColorStyle({
            variant: "dashed",
            color: "info",
            theme,
          }),
          "&.MuiButton-dashedWarning": getColorStyle({
            variant: "dashed",
            color: "warning",
            theme,
          }),
          "&.Mui-disabled": {
            color: `${theme.palette.grey[300]} !important`,
            borderColor: `${theme.palette.grey[400]} !important`,
            backgroundColor: `${theme.palette.grey[200]} !important`,
          },
        },
        shadow: {
          ...primaryShadow,
          "&.MuiButton-shadowPrimary": getColorStyle({
            variant: "shadow",
            color: "primary",
            theme,
          }),
          "&.MuiButton-shadowSecondary": getColorStyle({
            variant: "shadow",
            color: "secondary",
            theme,
          }),
          "&.MuiButton-shadowError": getColorStyle({
            variant: "shadow",
            color: "error",
            theme,
          }),
          "&.MuiButton-shadowSuccess": getColorStyle({
            variant: "shadow",
            color: "success",
            theme,
          }),
          "&.MuiButton-shadowInfo": getColorStyle({
            variant: "shadow",
            color: "info",
            theme,
          }),
          "&.MuiButton-shadowWarning": getColorStyle({
            variant: "shadow",
            color: "warning",
            theme,
          }),
          "&.Mui-disabled": {
            color: `${theme.palette.grey[300]} !important`,
            borderColor: `${theme.palette.grey[400]} !important`,
            backgroundColor: `${theme.palette.grey[200]} !important`,
          },
        },
        containedPrimary: getColorStyle({
          variant: "contained",
          color: "primary",
          theme,
        }),
        containedSecondary: getColorStyle({
          variant: "contained",
          color: "secondary",
          theme,
        }),
        containedError: getColorStyle({
          variant: "contained",
          color: "error",
          theme,
        }),
        containedSuccess: getColorStyle({
          variant: "contained",
          color: "success",
          theme,
        }),
        containedInfo: getColorStyle({
          variant: "contained",
          color: "info",
          theme,
        }),
        containedWarning: getColorStyle({
          variant: "contained",
          color: "warning",
          theme,
        }),
        outlinedPrimary: getColorStyle({
          variant: "outlined",
          color: "primary",
          theme,
        }),
        outlinedSecondary: getColorStyle({
          variant: "outlined",
          color: "secondary",
          theme,
        }),
        outlinedError: getColorStyle({
          variant: "outlined",
          color: "error",
          theme,
        }),
        outlinedSuccess: getColorStyle({
          variant: "outlined",
          color: "success",
          theme,
        }),
        outlinedInfo: getColorStyle({
          variant: "outlined",
          color: "info",
          theme,
        }),
        outlinedWarning: getColorStyle({
          variant: "outlined",
          color: "warning",
          theme,
        }),
        textPrimary: getColorStyle({
          variant: "text",
          color: "primary",
          theme,
        }),
        textSecondary: getColorStyle({
          variant: "text",
          color: "secondary",
          theme,
        }),
        textError: getColorStyle({ variant: "text", color: "error", theme }),
        textSuccess: getColorStyle({
          variant: "text",
          color: "success",
          theme,
        }),
        textInfo: getColorStyle({ variant: "text", color: "info", theme }),
        textWarning: getColorStyle({
          variant: "text",
          color: "warning",
          theme,
        }),
        sizeExtraSmall: {
          minWidth: 56,
          minHeight: "unset",
          fontSize: "12px",
          lineHeight: "20px",
          padding: "0 16px",
        },
      },
    },
  };
}
