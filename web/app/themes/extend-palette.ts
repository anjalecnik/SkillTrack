import { SimplePaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CustomColors {
    greekBlue: SimplePaletteColorOptions;
    red: SimplePaletteColorOptions;
    orange: SimplePaletteColorOptions;
  }

  interface Palette {
    customColors: CustomColors;
  }

  interface PaletteOptions {
    customColors: CustomColors;
  }
}
