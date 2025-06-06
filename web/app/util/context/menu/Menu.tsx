import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { NavItemType } from "~/types";
import { useLocation } from "@remix-run/react";
import { USER_HUB_PATH, WORKSPACE_HUB_PATH } from "~/constants";
import { LocalStorageService } from "~/util/services";
import { useMenuItemsList, useBottomMenuItemsList } from "./menuItems";

const MenuContext = createContext({
  menuState: {
    openedItem: "",
    isMenuOpened: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handlerActiveItem: (openedItem: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handlerDrawerOpen: (isDashboardDrawerOpened: boolean) => {},
  menuItemsList: [] as NavItemType[],
  bottomMenuItemsList: [] as NavItemType[],
});

export const useMenu = () => {
  return useContext(MenuContext);
};

export const MenuProvider = ({
  children,
  isSupervisor,
}: {
  children: ReactNode;
  isSupervisor: boolean;
}) => {
  const initialState = {
    openedItem: "",
    isMenuOpened: !!LocalStorageService.get("isMenuOpened") || false,
  };
  const [menuState, setMenuState] = useState(initialState);
  const { pathname } = useLocation();
  const fullMenuItemsList = useMenuItemsList();
  const fullBottomMenuItemsList = useBottomMenuItemsList();

  const menuItems = useMemo(() => {
    const isWorkspaceHub = pathname.includes(WORKSPACE_HUB_PATH);
    const isUserHub = pathname.includes(USER_HUB_PATH);

    const workspaceHubFilteredItems = [
      "dashboard",
      "projects",
      "employees",
      "positions",
      "requests",
      "reports",
      "performanceReviews",
      "jira",
    ];
    const userHubFilteredItems = [
      "dashboard",
      "requests",
      isSupervisor && "teamMembers",
      isSupervisor && "performanceReviews",
      isSupervisor && "reports",
      isSupervisor && "jira",
    ].filter(Boolean);

    return fullMenuItemsList
      .filter((item) => {
        if (isWorkspaceHub) {
          return workspaceHubFilteredItems.includes(item.id);
        } else if (isUserHub) {
          return userHubFilteredItems.includes(item.id);
        }
        return false;
      })
      .map((item) => ({
        ...item,
        url: isWorkspaceHub
          ? `${WORKSPACE_HUB_PATH}${item.url}`
          : isUserHub
          ? `${USER_HUB_PATH}${item.url}`
          : item.url,
      }));
  }, [pathname, isSupervisor, fullMenuItemsList]);

  const handlerActiveItem = (openedItem: string) => {
    setMenuState((prevMenuState) => ({
      ...prevMenuState,
      openedItem,
    }));
  };

  const handlerDrawerOpen = (isMenuOpened: boolean) => {
    LocalStorageService.set("isMenuOpened", isMenuOpened);
    setMenuState((prevMenuState) => ({
      ...prevMenuState,
      isMenuOpened,
    }));
  };

  const menuContextValue = {
    menuState,
    handlerActiveItem,
    handlerDrawerOpen,
    menuItemsList: menuItems,
    bottomMenuItemsList: fullBottomMenuItemsList,
  };

  return (
    <MenuContext.Provider value={menuContextValue}>
      {children}
    </MenuContext.Provider>
  );
};
