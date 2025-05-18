import { Theme } from "@mui/material";

export default function LoadingButton(theme: Theme) {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          padding: "6px 16px",
          "&.MuiLoadingButton-loading": {
            opacity: 0.9,
            textShadow: "none",
            backgroundColor: theme.palette.grey[300],
          },
          ".MuiLoadingButton-loadingIndicator": {
            color: theme.palette.grey[700],
          },
        },
      },
    },
  };
}
