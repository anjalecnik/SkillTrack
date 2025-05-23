import { NavItemType } from "~/types";
import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  RightOutlined,
  PaperClipOutlined,
  FileTextOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import i18next from "../../config/i18next";

export const menuItemsList: NavItemType[] = [
  {
    id: "dashboard",
    title: i18next.t("menu.dashboard"),
    type: "item",
    url: "/dashboard",
    icon: DashboardOutlined,
  },
  {
    id: "requests",
    title: i18next.t("menu.requests"),
    type: "item",
    url: "/requests",
    icon: BulbOutlined,
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
    id: "projects",
    title: i18next.t("menu.projects"),
    type: "item",
    url: "/projects",
    icon: FileTextOutlined,
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
