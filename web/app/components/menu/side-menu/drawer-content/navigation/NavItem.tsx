import { useEffect } from "react";
import { Link, useLocation, matchPath } from "@remix-run/react";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  LinkTarget,
  NavActionType,
  NavItemType,
} from "~/types/interfaces/menu/menu";
import { ThemeMode } from "~/types";
import { useMenu } from "~/util";
import { IconButton } from "~/components/common";

interface Props {
  item: NavItemType;
  level: number;
}

export default function NavItem({ item, level }: Props) {
  const theme = useTheme();

  const { menuState, handlerActiveItem, handlerDrawerOpen } = useMenu();
  const drawerOpen = menuState.isMenuOpened;
  const openItem = menuState.openedItem;

  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  let itemTarget: LinkTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  const Icon = item.icon!;
  const itemIcon = (
    <Icon
      sx={{
        fontSize: "1.25rem",
        ...(drawerOpen && {
          fontSize: "1.5rem",
        }),
      }}
    />
  );
  const SecondaryIcon = item.secondaryIcon;
  let secondaryItemIcon = null;
  if (SecondaryIcon) {
    secondaryItemIcon = (
      <SecondaryIcon
        sx={{
          fontSize: "1.25rem",
          ...(drawerOpen && {
            fontSize: "1.5rem",
          }),
        }}
      />
    );
  }

  const { pathname } = useLocation();
  const isSelected =
    !!matchPath({ path: item.url!, end: false }, pathname) &&
    openItem === item.id;

  // active menu item on page load
  useEffect(() => {
    if (pathname === item.url) handlerActiveItem(item.id!);
    // eslint-disable-next-line
  }, [pathname]);

  const textColor =
    theme.palette.mode === ThemeMode.DARK ? "grey.400" : "text.primary";
  const iconSelectedColor =
    theme.palette.mode === ThemeMode.DARK && drawerOpen
      ? "text.primary"
      : "primary.main";

  return (
    <>
      {item.divider && (
        <Divider
          sx={{
            margin: "10px 0",
          }}
        />
      )}
      <Box sx={{ position: "relative" }}>
        <ListItemButton
          component={Link}
          to={item.url!}
          target={itemTarget}
          disabled={item.disabled}
          selected={isSelected}
          sx={{
            zIndex: 1201,
            pl: drawerOpen ? `${level * 28}px` : 1.5,
            py: !drawerOpen && level === 1 ? 1.25 : 1,
            ...(drawerOpen && {
              "&:hover": {
                bgcolor:
                  theme.palette.mode === ThemeMode.DARK
                    ? "divider"
                    : "primary.lighter",
              },
              "&.Mui-selected": {
                bgcolor:
                  theme.palette.mode === ThemeMode.DARK
                    ? "divider"
                    : "primary.lighter",
                borderRight: `2px solid ${theme.palette.primary.main}`,
                color: iconSelectedColor,
                "&:hover": {
                  color: iconSelectedColor,
                  bgcolor:
                    theme.palette.mode === ThemeMode.DARK
                      ? "divider"
                      : "primary.lighter",
                },
              },
            }),
            ...(!drawerOpen && {
              "&:hover": {
                bgcolor: "transparent",
              },
              "&.Mui-selected": {
                "&:hover": {
                  bgcolor: "transparent",
                },
                bgcolor: "transparent",
              },
            }),
          }}
          {...(downLG && {
            onClick: () => handlerDrawerOpen(false),
          })}
        >
          {itemIcon && (
            <ListItemIcon
              sx={{
                minWidth: 28,
                color: isSelected ? iconSelectedColor : textColor,
                ...(!drawerOpen && {
                  borderRadius: 1.5,
                  width: 36,
                  height: 36,
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === ThemeMode.DARK
                        ? "secondary.light"
                        : "secondary.lighter",
                  },
                }),
                ...(!drawerOpen &&
                  isSelected && {
                    bgcolor:
                      theme.palette.mode === ThemeMode.DARK
                        ? "primary.900"
                        : "primary.lighter",
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === ThemeMode.DARK
                          ? "primary.darker"
                          : "primary.lighter",
                    },
                  }),
              }}
            >
              {itemIcon}
            </ListItemIcon>
          )}
          {(drawerOpen || (!drawerOpen && level !== 1)) && (
            <ListItemText
              primary={
                <Typography
                  variant="h6"
                  sx={{ color: isSelected ? iconSelectedColor : textColor }}
                >
                  {item.title}
                </Typography>
              }
            />
          )}
          {drawerOpen && item.secondaryIcon && (
            <ListItemIcon
              sx={{
                minWidth: 28,
                color: isSelected ? iconSelectedColor : textColor,
              }}
            >
              {secondaryItemIcon}
            </ListItemIcon>
          )}

          {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
        {(drawerOpen || (!drawerOpen && level !== 1)) &&
          item?.actions &&
          item?.actions.map((action, index) => {
            const ActionIcon = action.icon!;
            const callAction = action?.function;
            return (
              <IconButton
                key={index}
                {...(action.type === NavActionType.FUNCTION && {
                  onClick: (event) => {
                    event.stopPropagation();
                    callAction();
                  },
                })}
                {...(action.type === NavActionType.LINK && {
                  component: Link,
                  to: action.url,
                  target: action.target ? "_blank" : "_self",
                })}
                color="secondary"
                variant="outlined"
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 20,
                  zIndex: 1202,
                  width: 20,
                  height: 20,
                  mr: -1,
                  ml: 1,
                  color: "secondary.dark",
                  borderColor: isSelected ? "primary.light" : "secondary.light",
                  "&:hover": {
                    borderColor: isSelected ? "primary.main" : "secondary.main",
                  },
                }}
              >
                <ActionIcon style={{ fontSize: "0.625rem" }} />
              </IconButton>
            );
          })}
      </Box>
    </>
  );
}
