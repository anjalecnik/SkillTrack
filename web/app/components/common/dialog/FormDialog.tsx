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

interface IFormDialogProps {
  open: boolean;
  onClose: () => void;
  footer?: ReactNode;
  children: ReactNode;
  title: ReactNode;
  formId?: FormId;
  defaultAction?: { name: string; value: string };
}

export function FormDialog({
  open,
  onClose,
  footer,
  children,
  title,
  formId,
  defaultAction,
}: IFormDialogProps) {
  const theme = useTheme();

  return (
    <Dialog
      data-testid="formDialog"
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
      <Box>
        <Form method="post" id={formId} encType="multipart/form-data">
          {defaultAction && (
            <input
              type="submit"
              name={defaultAction.name}
              value={defaultAction.value}
              style={{ display: "none" }}
            />
          )}
          <DialogContent>{children}</DialogContent>
          {footer && (
            <DialogActions
              sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
            >
              {footer}
            </DialogActions>
          )}
        </Form>
      </Box>
    </Dialog>
  );
}
