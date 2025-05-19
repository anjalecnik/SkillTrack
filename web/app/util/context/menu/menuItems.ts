import { NavItemType } from "~/types";
import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  RightOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import i18next from "../../config/i18next";

export const menuItemsList: NavItemType[] = [
  {
    id: "dashboard",
    title: i18next.t("menu.dashboard"),
    type: "item",
    url: "",
    icon: DashboardOutlined,
  },
  {
    id: "employees",
    title: i18next.t("menu.employees"),
    type: "item",
    url: "/employees",
    icon: TeamOutlined,
  },
  {
    id: "positions",
    title: i18next.t("menu.positions"),
    type: "item",
    url: "/positions",
    icon: PaperClipOutlined,
  },
  {
    id: "teamMembers",
    title: i18next.t("menu.teamMembers"),
    type: "item",
    url: "/employees",
    icon: TeamOutlined,
  },
];

export const bottomMenuItemsList: NavItemType[] = [
  {
    id: "logout",
    title: i18next.t("menu.logout"),
    type: "item",
    url: "/logout",
    icon: LogoutOutlined,
    secondaryIcon: RightOutlined,
    divider: true,
  },
];
