import { useRouteLoaderData } from "@remix-run/react";
import { AppLayout, AppHeaderBreadcrumbs } from "~/components/layout";
import { BreadcrumbVariant } from "~/types";
import {
  Box,
  Card,
  Chip,
  CircularProgress,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { JiraClient } from "~/clients/jira.client";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { LoaderData } from "~/root";
import {
  DownOutlined,
  ExportOutlined,
  FolderOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { EmployeeWorkCard } from "~/components/features";

export default function UserHubMyWork() {
  const { user } = useRouteLoaderData<LoaderData>("root") ?? {};

  const [expandedTicketIndex, setExpandedTicketIndex] = useState<{
    [key: string]: number | null;
  }>({});
  const [loading, setLoading] = useState(true);
  const [myWork, setMyWork] = useState([]);

  useEffect(() => {
    const fetchWork = async () => {
      if (user) {
        setLoading(true);
        try {
          const jiraAssignedWork = await JiraClient.getMyWork(
            `${user.name} ${user.surname}`
          );
          setMyWork(jiraAssignedWork);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWork();
  }, [user]);

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[
          { text: t("myWork.myWork"), variant: BreadcrumbVariant.Current },
        ]}
      />
      <EmployeeWorkCard
        loading={loading}
        work={myWork}
        noWorkText="myWork.myWork"
      />
    </AppLayout>
  );
}
