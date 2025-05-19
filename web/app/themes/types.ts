import { LoadingButtonProps } from "@mui/lab";
import {
  ButtonProps,
  ChipProps,
  Components,
  IconButtonProps,
  PaletteColorOptions,
  SimplePaletteColorOptions,
  SliderProps,
  Theme,
} from "@mui/material";

export type ThemeMode = "light" | "dark";

export type ThemeDirection = "ltr" | "rtl";

export type FontFamily =
  | `'Inter', sans-serif`
  | `'Poppins', sans-serif`
  | `'Roboto', sans-serif`
  | `'Public Sans', sans-serif`;

export type CustomShadowProps = {
  button: string;
  text: string;
  z1: string;
  primary: string;
  primaryButton: string;
  secondary: string;
  secondaryButton: string;
  error: string;
  errorButton: string;
  warning: string;
  warningButton: string;
  info: string;
  infoButton: string;
  success: string;
  successButton: string;
  grey: string;
  greyButton: string;
};

export type PaletteThemeProps = {
  primary: SimplePaletteColorOptions;
  secondary: SimplePaletteColorOptions;
  error: SimplePaletteColorOptions;
  warning: SimplePaletteColorOptions;
  info: SimplePaletteColorOptions;
  success: SimplePaletteColorOptions;
  grey: PaletteColorOptions;
};

export type PresetColor =
  | "default"
  | "theme1"
  | "theme2"
  | "theme3"
  | "theme4"
  | "theme5"
  | "theme6"
  | "theme7"
  | "theme8";

export type ButtonVariantProps =
  | "contained"
  | "light"
  | "outlined"
  | "dashed"
  | "text"
  | "shadow";

export type IconButtonShapeProps = "rounded" | "square";

type TooltipColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "default";

export type ColorProps =
  | ChipProps["color"]
  | ButtonProps["color"]
  | IconButtonProps["color"]
  | LoadingButtonProps["color"]
  | SliderProps["color"]
  | TooltipColor;

export type AvatarTypeProps = "filled" | "outlined" | "combined";

export type SizeProps = "badge" | "xs" | "sm" | "md" | "lg" | "xl";

export type ExtendedStyleProps = {
  color: ColorProps;
  theme: Theme;
};

export type ComponentOverrideType<T extends keyof Components> = {
  [P in T]: Components[P];
};
