import { PalettesProps } from "@ant-design/colors";
import { PaletteColorOptions } from "@mui/material";
import { PaletteThemeProps, ThemeMode } from "../types";

const Theme4 = (colors: PalettesProps, mode: ThemeMode): PaletteThemeProps => {
  const { grey } = colors;
  const greyColors: PaletteColorOptions = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16],
  };
  const contrastText = "#fff";

  let primaryColors = [
    "#E6F3EC",
    "#84c297",
    "#5eb57d",
    "#3da866",
    "#1f9c53",
    "#068e44",
    "#006933",
    "#004222",
    "#001c0f",
    "#000000",
  ];
  let errorColors = ["#FDE8E7", "#F25E52", "#F04134", "#EE3B2F", "#E92A21"];
  let warningColors = ["#FFF7E0", "#FFC926", "#FFBF00", "#FFB900", "#FFA900"];
  let infoColors = ["#E0F4F5", "#26B0BA", "#00A2AE", "#009AA7", "#008694"];
  let successColors = ["#E0F5EA", "#26B56E", "#00A854", "#00A04D", "#008D3A"];

  if (mode === "dark") {
    primaryColors = [
      "#1a231f",
      "#173123",
      "#174029",
      "#13502f",
      "#0e6737",
      "#0a7d3e",
      "#1f8f4e",
      "#3ba162",
      "#5cb07a",
      "#82bf95",
    ];
    errorColors = ["#321d1d", "#7d2e28", "#d13c31", "#e66859", "#f8baaf"];
    warningColors = ["#342c1a", "#836611", "#dda705", "#e9bf28", "#f8e577"];
    infoColors = ["#1a2628", "#11595f", "#058e98", "#1ea6aa", "#64cfcb"];
    successColors = ["#1a2721", "#115c36", "#05934c", "#1da65d", "#61ca8b"];
  }

  return {
    primary: {
      lighter: primaryColors[0],
      100: primaryColors[1],
      200: primaryColors[2],
      light: primaryColors[3],
      400: primaryColors[4],
      main: primaryColors[5],
      dark: primaryColors[6],
      700: primaryColors[7],
      darker: primaryColors[8],
      900: primaryColors[9],
      contrastText,
    },
    secondary: {
      lighter: greyColors[100],
      100: greyColors[100],
      200: greyColors[200],
      light: greyColors[300],
      400: greyColors[400],
      main: greyColors[500] as string,
      600: greyColors[600],
      dark: greyColors[700],
      800: greyColors[800],
      darker: greyColors[900],
      A100: greyColors[0],
      A200: greyColors.A400,
      A300: greyColors.A700,
      contrastText: greyColors[0],
    },
    error: {
      lighter: errorColors[0],
      light: errorColors[1],
      main: errorColors[2],
      dark: errorColors[3],
      darker: errorColors[4],
      contrastText,
    },
    warning: {
      lighter: warningColors[0],
      light: warningColors[1],
      main: warningColors[2],
      dark: warningColors[3],
      darker: warningColors[4],
      contrastText: greyColors[100],
    },
    info: {
      lighter: infoColors[0],
      light: infoColors[1],
      main: infoColors[2],
      dark: infoColors[3],
      darker: infoColors[4],
      contrastText,
    },
    success: {
      lighter: successColors[0],
      light: successColors[1],
      main: successColors[2],
      dark: successColors[3],
      darker: successColors[4],
      contrastText,
    },
    grey: greyColors,
  };
};

export default Theme4;
