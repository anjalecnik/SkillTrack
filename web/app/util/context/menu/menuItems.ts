import { NavItemType } from "~/types";
import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  RightOutlined,
  PaperClipOutlined,
  FileTextOutlined,
  BulbOutlined,
  TableOutlined,
  LineChartOutlined,
  SolutionOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const useMenuItemsList = (): NavItemType[] => {
  const { t } = useTranslation();

  return [
    {
      id: "dashboard",
      title: t("menu.dashboard"),
      type: "item",
      url: "/dashboard",
      icon: DashboardOutlined,
    },
    {
      id: "requests",
      title: t("menu.requests"),
      type: "item",
      url: "/requests",
      icon: BulbOutlined,
    },
    {
      id: "myWork",
      title: t("menu.myWork"),
      type: "item",
      url: "/my-work",
      icon: CodeOutlined,
    },
    {
      id: "employees",
      title: t("menu.employees"),
      type: "item",
      url: "/employees",
      icon: TeamOutlined,
    },
    {
      id: "teamMembers",
      title: t("menu.teamMembers"),
      type: "item",
      url: "/employees",
      icon: TeamOutlined,
    },
    {
      id: "positions",
      title: t("menu.positions"),
      type: "item",
      url: "/positions",
      icon: PaperClipOutlined,
    },
    {
      id: "projects",
      title: t("menu.projects"),
      type: "item",
      url: "/projects",
      icon: FileTextOutlined,
    },
    {
      id: "performanceReviews",
      title: t("menu.performanceReviews"),
      type: "item",
      url: "/performance-reviews",
      icon: SolutionOutlined,
    },
    {
      id: "reports",
      title: t("menu.reports"),
      type: "item",
      url: "/reports",
      icon: LineChartOutlined,
    },
    {
      id: "jira",
      title: t("menu.jira"),
      type: "item",
      url: "/jira",
      icon: TableOutlined,
    },
  ];
};

export const useBottomMenuItemsList = (): NavItemType[] => {
  const { t } = useTranslation();

  return [
    {
      id: "logout",
      title: t("menu.logout"),
      type: "item",
      url: "/logout",
      icon: LogoutOutlined,
      secondaryIcon: RightOutlined,
      divider: true,
    },
  ];
};
