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
      <Card sx={{ padding: 3 }}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            minHeight="150px"
          >
            <CircularProgress />
          </Box>
        ) : myWork.length === 0 ? (
          <Typography variant="body1">{t("myWork.noWork")}</Typography>
        ) : (
          myWork.map((project: any) => (
            <Paper
              key={project.project}
              elevation={2}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                backgroundColor: "background.paper",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 6,
                  backgroundColor: "action.hover",
                },
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <FolderOutlined color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {project.project}
                    </a>
                  </Typography>
                  <Tooltip title={t("myWork.openProjectInJira")}>
                    <IconButton
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      <ExportOutlined />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Chip
                  label={`${project.tickets.length} ${t("myWork.tickets")}`}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              </Box>

              <List dense disablePadding>
                {project.tickets.map((ticket: any, idx: number) => {
                  const isExpanded =
                    expandedTicketIndex[project.project] === idx;

                  return (
                    <Box key={idx}>
                      <ListItem
                        sx={{
                          pl: 1,
                          borderRadius: 1,
                          transition: "0.2s",
                          "&:hover": {
                            backgroundColor: "action.hover",
                            cursor: "pointer",
                          },
                        }}
                        onClick={() =>
                          setExpandedTicketIndex((prev) => ({
                            ...prev,
                            [project.project]: isExpanded ? null : idx,
                          }))
                        }
                        secondaryAction={
                          <Tooltip title={t("myWork.openTicketInJira")}>
                            <IconButton
                              edge="end"
                              href={ticket.ticketUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                            >
                              <ExportOutlined />
                            </IconButton>
                          </Tooltip>
                        }
                      >
                        <ListItemIcon>
                          {!isExpanded ? <DownOutlined /> : <UpOutlined />}
                        </ListItemIcon>
                        <ListItemText primary={ticket.summary} />
                        <ListItemText
                          primary={
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Typography variant="body2" fontWeight={500}>
                                {ticket.summary}
                              </Typography>
                              <Chip
                                label={ticket.status}
                                size="small"
                                color={
                                  ticket.status
                                    .toLowerCase()
                                    .includes("progress")
                                    ? "warning"
                                    : ticket.status
                                        .toLowerCase()
                                        .includes("to do")
                                    ? "default"
                                    : "info"
                                }
                                sx={{ ml: 2 }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>

                      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Box sx={{ pl: 6, pr: 2, pb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            {ticket.description}
                          </Typography>
                        </Box>
                      </Collapse>
                    </Box>
                  );
                })}
              </List>
            </Paper>
          ))
        )}
      </Card>
    </AppLayout>
  );
}
