import { ReactNode } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import { CloseOutlined } from "@ant-design/icons";
import { FormId } from "@conform-to/react";
import { Form } from "@remix-run/react";
import { Button } from "~/components/common";
import { t } from "i18next";

interface IWarningDialogProps {
  open: boolean;
  onClose: () => void;
  onClick?: () => void;
  children?: ReactNode;
  title?: ReactNode;
  submitButtonText?: ReactNode;
  formId?: FormId;
  isLoading?: boolean;
  id: number | number[] | null;
}

export function WarningDialog({
  open,
  onClose,
  onClick,
  formId,
  isLoading,
  id,
  ...rest
}: IWarningDialogProps) {
  const theme = useTheme();
  const {
    children = t("common.thisActionCannotBeUndone"),
    title = t("common.areYouSureYouWantToDelete"),
    submitButtonText = t("common.delete"),
  } = rest;

  return (
    <Dialog
      open={open}
      disableScrollLock
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Grid item>
          <DialogTitle>{title}</DialogTitle>
        </Grid>
        <Grid item sx={{ mr: 1.5 }}>
          <IconButton color="secondary" onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        </Grid>
      </Grid>
      <Box sx={{ p: 1, py: 1.5 }}>
        <Form method="post" id={formId}>
          <DialogContent>{children}</DialogContent>

          <DialogActions
            sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
          >
            <input
              type="hidden"
              name={
                Array.isArray(id)
                  ? "ids"
                  : typeof id === "number"
                  ? "id"
                  : undefined
              }
              value={
                Array.isArray(id)
                  ? JSON.stringify(id)
                  : typeof id === "number"
                  ? id
                  : undefined
              }
            />
            <Button variant="outlined" onClick={onClose} disabled={isLoading}>
              {t("common.cancel")}
            </Button>
            <Button
              variant="contained"
              color="error"
              value="delete"
              name="intent"
              type={onClick ? "button" : "submit"}
              onClick={onClick}
              loading={isLoading}
            >
              {submitButtonText}
            </Button>
          </DialogActions>
        </Form>
      </Box>
    </Dialog>
  );
}
