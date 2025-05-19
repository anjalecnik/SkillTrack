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

export interface IAlertDialogProps {
  open: boolean;
  onClose: () => void;
  footer?: ReactNode;
  children: ReactNode;
  title: ReactNode;
}

export function AlertDialog({
  open,
  onClose,
  footer,
  children,
  title,
}: IAlertDialogProps) {
  const theme = useTheme();

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
        <DialogContent>{children}</DialogContent>
        {footer && (
          <DialogActions
            sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
          >
            {footer}
          </DialogActions>
        )}
      </Box>
    </Dialog>
  );
}
