import { enqueueSnackbar } from "notistack";

export function displaySuccess(message: string) {
  enqueueSnackbar(message, {
    variant: "success",
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
  });
}
