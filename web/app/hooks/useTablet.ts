import { useMediaQuery, useTheme } from "@mui/material";

export function useTablet() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return isTablet;
}
