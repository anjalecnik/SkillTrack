import {
  PalettesProps,
  presetDarkPalettes,
  presetPalettes,
} from "@ant-design/colors";
import { alpha, createTheme } from "@mui/material";
import { ThemeOption } from "./theme";
import { PaletteThemeProps, PresetColor, ThemeMode } from "./types";
import { breakpoints } from "./breakpoints";

export const Palette = (mode: ThemeMode, presetColor: PresetColor) => {
  const colors: PalettesProps =
    mode === "dark" ? presetDarkPalettes : presetPalettes;

  let greyPrimary = [
    "#ffffff",
    "#fafafa",
    "#f5f5f5",
    "#f0f0f0",
    "#d9d9d9",
    "#bfbfbf",
    "#8c8c8c",
    "#595959",
    "#262626",
    "#141414",
    "#000000",
  ];
  let greyAscent = ["#fafafa", "#bfbfbf", "#434343", "#1f1f1f"];
  let greyConstant = ["#fafafb", "#e6ebf1"];

  if (mode === "dark") {
    greyPrimary = [
      "#000000",
      "#141414",
      "#1e1e1e",
      "#595959",
      "#8c8c8c",
      "#bfbfbf",
      "#d9d9d9",
      "#f0f0f0",
      "#f5f5f5",
      "#fafafa",
      "#ffffff",
    ];
    // greyPrimary.reverse();
    greyAscent = ["#fafafa", "#bfbfbf", "#434343", "#1f1f1f"];
    greyConstant = ["#121212", "#d3d8db"];
  }
  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor: PaletteThemeProps = ThemeOption(
    colors,
    presetColor,
    mode
  );

  return createTheme({
    breakpoints,
    palette: {
      mode,
      common: {
        black: "#000",
        white: "#fff",
      },
      customColors: {
        greekBlue: { light: "#F0F5FF", main: "#2F54EB" },
        red: { light: "#FFCDD2", main: "#FF0000", dark: "#B71C1C" },
        orange: {
          light: "#faaf134d",
          main: "#faae13",
          dark: "#da8b00",
        },
      },
      ...paletteColor,
      text: {
        primary:
          mode === "dark"
            ? alpha(paletteColor.grey[900] as string, 0.87)
            : paletteColor.grey[700],
        secondary:
          mode === "dark"
            ? alpha(paletteColor.grey[900] as string, 0.45)
            : paletteColor.grey[500],
        disabled:
          mode === "dark"
            ? alpha(paletteColor.grey[900] as string, 0.1)
            : paletteColor.grey[400],
      },
      action: {
        disabled: paletteColor.grey[300],
      },
      divider:
        mode === "dark"
          ? alpha(paletteColor.grey[900] as string, 0.05)
          : paletteColor.grey[200],
      background: {
        paper: mode === "dark" ? paletteColor.grey[100] : paletteColor.grey[0],
        default: paletteColor.grey.A50,
      },
    },
  });
};
