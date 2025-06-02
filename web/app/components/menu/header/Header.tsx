import {
  AppBar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  DRAWER_WIDTH,
  HEADER_HEIGHT,
  MINI_DRAWER_WIDTH,
  USER_HUB_PATH,
  WORKSPACE_HUB_PATH,
} from "~/constants";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Flex, Avatar, IconButton } from "~/components/common";
import { displaySuccess, fullNameFormatter, useMenu } from "~/util";
import { AuthClient } from "~/clients";
import { useLocation, useNavigate, useRouteLoaderData } from "@remix-run/react";
import { IWorkspaceRoot, UserRoles } from "~/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "./LanguageSelect";

interface WorkspaceUser {
  name: string;
  surname: string;
  id?: number;
}

export function Header({ children }: { children?: React.ReactNode }) {
  const { user } = useRouteLoaderData<IWorkspaceRoot>("root") ?? {
    user: { name: "", surname: "" } as WorkspaceUser,
  };
  const { pathname } = useLocation();
  const theme = useTheme();
  const { menuState, handlerDrawerOpen } = useMenu();
  const drawerOpen = menuState.isMenuOpened;
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState(false);
  const workspaceUserRole = AuthClient.getUserRole();
  const isInWorkspaceHub = pathname.includes(WORKSPACE_HUB_PATH);

  const { i18n, t } = useTranslation();

  const handleCheckedChange = (checked: boolean) => {
    setDisableButton(true);
    if (checked) {
      displaySuccess(t("common.successfullyChangedToAdmin"));
      return navigate(`${WORKSPACE_HUB_PATH}/requests`);
    }
    displaySuccess(t("common.successfullyChangedToUser"));
    navigate(`${USER_HUB_PATH}/dashboard`);
  };

  return (
    <AppBar
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: "none",
        maxHeight: `${HEADER_HEIGHT}`,
        display: "flex",
        justifyContent: "center",
        width: {
          xs: "100%",
          lg: drawerOpen
            ? `calc(100vw - ${DRAWER_WIDTH}px)`
            : `calc(100vw - ${MINI_DRAWER_WIDTH}px)`,
        },
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <IconButton
          aria-label="open drawer"
          onClick={() => {
            handlerDrawerOpen(!drawerOpen);
          }}
          edge="start"
          color="secondary"
          variant="light"
          sx={{
            color: "text.primary",
            ml: { xs: 0, lg: -2 },
          }}
        >
          {drawerOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </IconButton>
        <Flex gap="10px" alignItems="center">
          {workspaceUserRole !== UserRoles.User && (
            <Flex gap="5px" alignItems="center">
              <Typography
                sx={{
                  color: "black",
                }}
              >
                {isInWorkspaceHub ? t("common.admin") : t("common.user")}
              </Typography>
              <Tooltip
                title={
                  isInWorkspaceHub
                    ? t("common.changeToUserView")
                    : t("common.changeToAdminView")
                }
              >
                <Switch
                  checked={isInWorkspaceHub}
                  onChange={(_, checked) => handleCheckedChange(checked)}
                  disabled={disableButton}
                />
              </Tooltip>
            </Flex>
          )}
          {children}

          <Avatar
            avatarId={user.id}
            size="32px"
            fontSize="14px"
            name={`${user.name} ${user.surname}`}
          />
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.palette.secondary.dark,
            }}
          >
            {fullNameFormatter(user)}
          </Typography>
          <LanguageSelect
            currentLang={i18n.language}
            onChangeLang={(code) => i18n.changeLanguage(code)}
          />
        </Flex>
      </Toolbar>
    </AppBar>
  );
}
