import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import {
  CssBaseline,
  StyledEngineProvider,
  createTheme,
  Theme,
  ThemeOptions,
  ThemeProvider,
  TypographyVariantsOptions,
} from "@mui/material";
import componentsOverride from "./overrides";
import { Palette } from "./palette";
import { CustomShadows } from "./shadows";
import {
  CustomShadowProps,
  FontFamily,
  PresetColor,
  ThemeDirection,
  ThemeMode,
} from "./types";
import { Typography } from "./typography";
import { breakpoints } from "./breakpoints";

type ThemeCustomizationProps = {
  children: ReactNode;
};

class ThemeStore {
  themeDirection: ThemeDirection = "ltr";
  mode: ThemeMode = "light";
  presetColor: PresetColor = "default";
  fontFamily: FontFamily = "'Public Sans', sans-serif";
}

export const ThemeContext = createContext<null | ThemeStore>(null);

export const useThemeContext = () => useContext(ThemeContext);

export const CustomTheme = ({ children }: ThemeCustomizationProps) => {
  const [store] = useState(() => new ThemeStore());

  const { themeDirection, mode, presetColor, fontFamily } = store;

  const theme: Theme = useMemo<Theme>(
    () => Palette(mode, presetColor),
    [mode, presetColor]
  );

  const themeTypography: TypographyVariantsOptions =
    useMemo<TypographyVariantsOptions>(
      () => Typography(mode, fontFamily, theme),
      [mode, fontFamily, theme]
    );
  const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(
    () => CustomShadows(theme),
    [theme]
  );

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: breakpoints,
      direction: themeDirection,
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [themeDirection, theme, themeTypography, themeCustomShadows]
  );

  const themes: Theme = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={store}>
        <ThemeProvider theme={themes}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
};
