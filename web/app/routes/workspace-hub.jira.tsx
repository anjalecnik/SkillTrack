import { Form, useLoaderData } from "@remix-run/react";
import { AppLayout, AppHeaderBreadcrumbs } from "~/components/layout";
import { BreadcrumbVariant } from "~/types";
import { FormProvider, useForm } from "@conform-to/react";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
  Box,
  Card,
  TextField,
  TableContainer,
} from "@mui/material";
import { parseWithZod } from "@conform-to/zod";
import { jiraStatsSchema } from "~/schemas/jira-stats-schema";
import { JiraClient } from "~/clients/jira.client";
import { useEffect, useState } from "react";
import { JiraStats, JiraUnassignedIssues } from "~/types/jira";

export const clientLoader = async () => {
  const projects = await JiraClient.getProjects();
  return { projects };
};

export default function UserHubJira() {
  const { projects } = useLoaderData<typeof clientLoader>();

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: jiraStatsSchema });
    },
    id: "jira-analyzer-form",
    shouldRevalidate: "onBlur",
  });

  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [liveStats, setLiveStats] = useState<JiraStats[]>([]);
  const [tickets, setTickets] = useState<JiraUnassignedIssues[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const handleAssign = async (accountId: string) => {
    if (!selectedTicket) return;

    try {
      await JiraClient.assignTicketToUser(
        selectedTicket.split(" ")[0],
        accountId
      );
      setSelectedTicket(null);
      const updatedTickets = await JiraClient.getUnassignedTickets(
        selectedProject!
      );
      setTickets(updatedTickets);

      const stats = await JiraClient.getJiraProjectStats(selectedProject!);
      setLiveStats(stats);
    } catch (error) {
      console.error("Failed to assign ticket:", error);
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      if (!selectedProject) return;
      const projectTickets =
        await JiraClient.getUnassignedTickets(selectedProject);
      setTickets(projectTickets);
    };
    fetchTickets();
  }, [selectedProject]);

  useEffect(() => {
    const fetchTicketsAndStats = async () => {
      if (!selectedProject) return;

      const projectTickets =
        await JiraClient.getUnassignedTickets(selectedProject);
      setTickets(projectTickets);

      const stats = await JiraClient.getJiraProjectStats(selectedProject);
      setLiveStats(stats);
    };

    fetchTicketsAndStats();
  }, [selectedProject]);

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[{ text: "Jira Workload", variant: BreadcrumbVariant.Current }]}
      />
      <Card sx={{ padding: "20px" }}>
        <FormProvider context={form.context}>
          <Form method="post" id={form.id}>
            <Box sx={{ paddingBottom: 3 }}>
              <Autocomplete
                value={selectedProject}
                onChange={(_, value) => {
                  setSelectedProject(value);
                  setSelectedTicket(null);
                }}
                options={projects.map((p) => p.key)}
                sx={{ mt: 1, mb: 3, width: 600 }}
                renderInput={(params) => (
                  <TextField {...params} label="Project" />
                )}
              />

              <Autocomplete
                value={selectedTicket}
                onChange={(_, value) => setSelectedTicket(value)}
                options={tickets.map((p) => `${p.key} ${p.summary}`)}
                sx={{ mt: 1, mb: 3, width: 600 }}
                renderInput={(params) => (
                  <TextField {...params} label="Unassigned Ticket" required />
                )}
              />
            </Box>
          </Form>
        </FormProvider>

        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>To Do</TableCell>
                  <TableCell>In Progress</TableCell>
                  <TableCell>Done</TableCell>
                  <TableCell>Total Done</TableCell>
                  <TableCell>Total Assigned</TableCell>
                  <TableCell sx={{ width: 160, textAlign: "center" }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {(liveStats.length > 0
                  ? liveStats
                  : Array.from({ length: 4 })
                ).map((s: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{s?.user ?? "—"}</TableCell>
                    <TableCell>{s?.todo ?? "—"}</TableCell>
                    <TableCell>{s?.inProgress ?? "—"}</TableCell>
                    <TableCell>{s?.done ?? "—"}</TableCell>
                    <TableCell>{s?.totalDoneHistory ?? "—"}</TableCell>
                    <TableCell>{s?.totalAssigned ?? "—"}</TableCell>
                    <TableCell sx={{ width: 160, textAlign: "center" }}>
                      {selectedTicket ? (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleAssign(s.accountId)}
                        >
                          Assign Ticket
                        </Button>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </AppLayout>
  );
}
