import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { NavItemType, SearchParam } from "~/types";
import { useLocation, useParams, useSearchParams } from "@remix-run/react";
import { bottomMenuItemsList, menuItemsList } from "./menuItems";
import { USER_HUB_PATH, WORKSPACE_HUB_PATH } from "~/constants";
import { LocalStorageService } from "~/util/services";

const MenuContext = createContext({
  menuState: {
    openedItem: "",
    isMenuOpened: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handlerActiveItem: (openedItem: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handlerDrawerOpen: (isDashboardDrawerOpened: boolean) => {},
  menuItemsList,
  bottomMenuItemsList,
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
  const [menuItems, setMenuItems] = useState<NavItemType[]>([]);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const isWorkspaceHub = pathname.includes(WORKSPACE_HUB_PATH);
    const isUserHub = pathname.includes(USER_HUB_PATH);
    const workspaceHubFilteredItems = [
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
      isSupervisor && "performanceReviews",
      isSupervisor && "jira",
      isSupervisor && "teamMembers",
    ];

    const menu = menuItemsList
      .filter((item) => {
        if (isWorkspaceHub) {
          // Temporary filtering of menu items until we implement them
          return workspaceHubFilteredItems.includes(item.id);
        } else if (isUserHub) {
          return userHubFilteredItems.includes(item.id);
        }
      })
      .map((item) => ({
        ...item,
        // if user is in workspace hub, prefix all urls with workspace-hub else prefix with user-hub
        url: isWorkspaceHub
          ? `${WORKSPACE_HUB_PATH}${item.url}`
          : isUserHub
          ? `${USER_HUB_PATH}${item.url}`
          : item.url,
      }));

    setMenuItems(menu);
  }, [pathname]);

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
    bottomMenuItemsList,
  };

  return (
    <MenuContext.Provider value={menuContextValue}>
      {children}
    </MenuContext.Provider>
  );
};
