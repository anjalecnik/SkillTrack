//material-ui
import { styled } from "@mui/material";

// third-party
import { SnackbarProvider } from "notistack";

// project import

// assets
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";

// custom styles
const StyledSnackbarProvider = styled(SnackbarProvider)(({ theme }) => ({
  "&.notistack-MuiContent-default": {
    backgroundColor: theme.palette.primary.main,
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: theme.palette.error.main,
  },
  "&.notistack-MuiContent-success": {
    backgroundColor: theme.palette.success.main,
  },
  "&.notistack-MuiContent-info": {
    backgroundColor: theme.palette.info.main,
  },
  "&.notistack-MuiContent-warning": {
    backgroundColor: theme.palette.warning.main,
  },
}));

// ===========================|| SNACKBAR - NOTISTACK ||=========================== //

export const Notistack = ({ children }: { children: ReactNode }) => {
  const iconSX = { marginRight: 8, fontSize: "1.15rem" };

  return (
    <StyledSnackbarProvider
      maxSnack={3}
      iconVariant={{
        success: <CheckCircleOutlined style={iconSX} />,
        error: <CloseCircleOutlined style={iconSX} />,
        warning: <WarningOutlined style={iconSX} />,
        info: <InfoCircleOutlined style={iconSX} />,
      }}
    >
      {children}
    </StyledSnackbarProvider>
  );
};
