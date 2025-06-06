import { Box, CheckboxProps , Theme } from "@mui/material";
import { ComponentOverrideType, ExtendedStyleProps } from "../types";
import { getColors } from "../utils";

function getColorStyle({ color, theme }: ExtendedStyleProps) {
  const colors = getColors(theme, color);
  const { lighter, main, dark } = colors;

  return {
    "& .dot": {
      backgroundColor: main,
    },
    "&:hover": {
      backgroundColor: lighter,
    },
    "&.Mui-focusVisible": {
      outline: `2px solid ${dark}`,
      outlineOffset: -4,
    },
  };
}

interface RadioSizeProps {
  size: number;
  dotSize: number;
  position: number;
}

function getSizeStyle(size?: CheckboxProps["size"]): RadioSizeProps {
  switch (size) {
    case "small":
      return { size: 16, dotSize: 8, position: 3 };
    case "large":
      return { size: 24, dotSize: 12, position: 5 };
    case "medium":
    default:
      return { size: 20, dotSize: 10, position: 4 };
  }
}

function radioStyle(size?: CheckboxProps["size"]) {
  const sizes: RadioSizeProps = getSizeStyle(size);

  return {
    "& .icon": {
      width: sizes.size,
      height: sizes.size,
      "& .dot": {
        width: sizes.dotSize,
        height: sizes.dotSize,
        top: sizes.position,
        left: sizes.position,
      },
    },
  };
}

export default function Radio(theme: Theme): ComponentOverrideType<"MuiRadio"> {
  const { palette } = theme;

  return {
    MuiRadio: {
      defaultProps: {
        className: "size-small",
        icon: (
          <Box
            className="icon"
            sx={{
              width: 16,
              height: 16,
              border: "1px solid",
              borderColor: "inherit",
              borderRadius: "50%",
            }}
          />
        ),
        checkedIcon: (
          <Box
            className="icon"
            sx={{
              width: 16,
              height: 16,
              border: "1px solid",
              borderColor: "inherit",
              borderRadius: "50%",
              position: "relative",
            }}
          >
            <Box
              className="dot"
              sx={{
                width: 8,
                height: 8,
                backgroundColor: "inherit",
                borderRadius: "50%",
                position: "absolute",
                top: 3,
                left: 3,
              }}
            />
          </Box>
        ),
      },
      styleOverrides: {
        root: {
          color: palette.secondary[300],
          "&.size-small": {
            ...radioStyle("small"),
          },
          "&.size-medium": {
            ...radioStyle("medium"),
          },
          "&.size-large": {
            ...radioStyle("large"),
          },
        },
        colorPrimary: getColorStyle({ color: "primary", theme }),
        colorSecondary: getColorStyle({ color: "secondary", theme }),
        // TODO: check below
        // colorSuccess: getColorStyle({ color: "success", theme }),
        // colorWarning: getColorStyle({ color: "warning", theme }),
        // colorInfo: getColorStyle({ color: "info", theme }),
        // colorError: getColorStyle({ color: "error", theme }),
      },
    },
  };
}
