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
import { RocketOutlined } from "@ant-design/icons";

export const clientLoader = async () => {
  const projects = await JiraClient.getProjects();
  return { projects };
};

const waveAnimation = `
@keyframes wave {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

if (
  typeof window !== "undefined" &&
  !document.getElementById("wave-animation")
) {
  const style = document.createElement("style");
  style.id = "wave-animation";
  style.innerHTML = waveAnimation;
  document.head.appendChild(style);
}

export default function UserHubJira() {
  const { projects } = useLoaderData<typeof clientLoader>();

  const [form] = useForm({
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
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

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

  const handleOpenAI = async () => {
    if (!selectedProject || !selectedTicket) return;

    setIsLoadingAI(true);
    setAiResponse(null);

    try {
      const result = await JiraClient.getOpenAISuggestion(
        selectedProject,
        selectedTicket.split(" ")[0]
      );

      const formatted = `${result.name}\n${result.reason}`;
      setAiResponse(formatted);
    } catch (error) {
      console.error("AI suggestion failed:", error);
      setAiResponse("Something went wrong. Please try again.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      if (!selectedProject) return;
      const projectTickets = await JiraClient.getUnassignedTickets(
        selectedProject
      );
      setTickets(projectTickets);
    };
    fetchTickets();
  }, [selectedProject]);

  useEffect(() => {
    const fetchTicketsAndStats = async () => {
      if (!selectedProject) return;

      const projectTickets = await JiraClient.getUnassignedTickets(
        selectedProject
      );
      setTickets(projectTickets);

      const stats = await JiraClient.getJiraProjectStats(selectedProject);
      setLiveStats(stats);
    };

    fetchTicketsAndStats();
  }, [selectedProject]);

  return (
    <AppLayout>
      <style>
        {`
      .three-body {
        --uib-size: 35px;
        --uib-speed: 0.8s;
        --uib-color: #1890ff;
        position: relative;
        display: inline-block;
        height: var(--uib-size);
        width: var(--uib-size);
        animation: spin78236 calc(var(--uib-speed) * 2.5) infinite linear;
      }
    
      .three-body__dot {
        position: absolute;
        height: 100%;
        width: 30%;
      }
    
      .three-body__dot:after {
        content: '';
        position: absolute;
        height: 0%;
        width: 100%;
        padding-bottom: 100%;
        background-color: var(--uib-color);
        border-radius: 50%;
      }
    
      .three-body__dot:nth-child(1) {
        bottom: 5%;
        left: 0;
        transform: rotate(60deg);
        transform-origin: 50% 85%;
      }
    
      .three-body__dot:nth-child(1)::after {
        bottom: 0;
        left: 0;
        animation: wobble1 var(--uib-speed) infinite ease-in-out;
        animation-delay: calc(var(--uib-speed) * -0.3);
      }
    
      .three-body__dot:nth-child(2) {
        bottom: 5%;
        right: 0;
        transform: rotate(-60deg);
        transform-origin: 50% 85%;
      }
    
      .three-body__dot:nth-child(2)::after {
        bottom: 0;
        left: 0;
        animation: wobble1 var(--uib-speed) infinite calc(var(--uib-speed) * -0.15) ease-in-out;
      }
    
      .three-body__dot:nth-child(3) {
        bottom: -5%;
        left: 0;
        transform: translateX(116.666%);
      }
    
      .three-body__dot:nth-child(3)::after {
        top: 0;
        left: 0;
        animation: wobble2 var(--uib-speed) infinite ease-in-out;
      }
    
      @keyframes spin78236 {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    
      @keyframes wobble1 {
        0%, 100% {
          transform: translateY(0%) scale(1);
          opacity: 1;
        }
        50% {
          transform: translateY(-66%) scale(0.65);
          opacity: 0.8;
        }
      }
    
      @keyframes wobble2 {
        0%, 100% {
          transform: translateY(0%) scale(1);
          opacity: 1;
        }
        50% {
          transform: translateY(66%) scale(0.65);
          opacity: 0.8;
        }
      }
    
   
    `}
      </style>

      <AppHeaderBreadcrumbs
        list={[{ text: "Jira Workload", variant: BreadcrumbVariant.Current }]}
      />
      <Card sx={{ padding: "20px" }}>
        <FormProvider context={form.context}>
          <Form method="post" id={form.id}>
            <Box
              sx={{
                display: "flex",
                gap: 4,
                alignItems: "flex-start",
                marginBottom: 4,
              }}
            >
              <Box>
                <FormProvider context={form.context}>
                  <Form method="post" id={form.id}>
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
                        <TextField
                          {...params}
                          label="Unassigned Ticket"
                          required
                        />
                      )}
                    />
                  </Form>
                </FormProvider>

                {selectedProject && selectedTicket && (
                  <Button
                    onClick={handleOpenAI}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "inherit",
                      cursor: "pointer",
                      fontWeight: 500,
                      fontSize: "14px",
                      padding: "0.3em 1em 0.3em 0.9em",
                      color: "white",
                      background:
                        "linear-gradient(to right, #1890ff, #40a9ff, #69c0ff)",
                      border: "none",
                      letterSpacing: "0.05em",
                      borderRadius: "12px",
                      boxShadow: "0 3px 10px rgba(24, 144, 255, 0.4)",
                      transition: "background-color 0.4s ease, color 0.4s ease",

                      "& svg": {
                        marginRight: "5px",
                        transform: "rotate(30deg)",
                        transition:
                          "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1), margin 0.3s",
                      },
                      "& span": {
                        transition:
                          "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
                      },
                      "&:hover svg": {
                        transform: "translateX(8px) rotate(90deg)",
                        marginRight: "10px",
                      },
                      "&:hover span": {
                        transform: "translateX(5px)",
                      },
                      "&:hover": {
                        backgroundColor: "#40a9ff",
                        color: "#fff",
                      },
                    }}
                  >
                    <RocketOutlined />
                    <span>Ask AI</span>
                  </Button>
                )}
              </Box>

              {selectedProject && selectedTicket && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  {isLoadingAI ? (
                    <Box
                      sx={{
                        width: "75%",
                        height: "178px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "flex-end",
                      }}
                    >
                      <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                      </div>
                    </Box>
                  ) : aiResponse ? (
                    <Box
                      sx={{
                        position: "relative",
                        width: "75%",
                        height: "auto",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0px 8px 28px -9px rgba(0,0,0,0.35)",
                        backgroundColor: "#f0f8ff",
                        alignSelf: "flex-end",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* Animated Waves */}
                      {[0, 1, 2].map((i) => (
                        <Box
                          key={i}
                          sx={{
                            position: "absolute",
                            width: "130%",
                            height: "150%",
                            opacity: 0.5,
                            top: "160%",
                            transform: "translate(-50%, -50%)",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(744deg, #1890ff, #40a9ff 60%, #69c0ff)",
                            animation: `wave ${
                              i === 0 ? "6s" : i === 1 ? "7s" : "8s"
                            } linear infinite`,
                            zIndex: 0,
                          }}
                        />
                      ))}

                      <Box
                        sx={{
                          position: "relative",
                          zIndex: 1,
                          color: "#003a8c",
                          textAlign: "center",
                          fontSize: "18px",
                          fontWeight: 600,
                          px: 2,
                        }}
                      >
                        <RocketOutlined
                          style={{ fontSize: "34px", marginBottom: "8px" }}
                        />
                        <br />
                        Suggested Assignee
                        <Box
                          sx={{
                            fontSize: "15px",
                            fontWeight: 400,
                            marginTop: "1em",
                            lineHeight: 1.6,
                            color: "#002766",
                          }}
                        >
                          <strong>{aiResponse?.split("\n")[0]}</strong>
                          <div>
                            {aiResponse?.split("\n").slice(1).join(" ")}
                          </div>
                        </Box>
                      </Box>
                    </Box>
                  ) : null}
                </Box>
              )}
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
