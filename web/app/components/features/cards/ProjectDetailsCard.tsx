import { OverviewCardLayout, CopyToClipboard } from "~/components/common";
import { IProject, WorkspaceProjectUserRole } from "~/types";
import { t } from "i18next";
import {
  CalendarOutlined,
  FieldTimeOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatDate, fullNameFormatter } from "~/util";

interface IProjectDetailsCardProps {
  project: IProject;
}

export function ProjectDetailsCard({ project }: IProjectDetailsCardProps) {
  const { name, dateStart, dateEnd, participants, totalDays, totalHours, id } =
    project || {};

  const employeeCount = `${participants.length ?? 0} ${t(
    "workspaceProjects.employeesCount"
  )}`;
  const projectLead = participants.find(
    (participant) => participant.projectRole === WorkspaceProjectUserRole.Lead
  );
  const formattedProjectLead = projectLead
    ? fullNameFormatter(projectLead)
    : t("workspaceProjects.noProjectLead");

  return (
    <OverviewCardLayout
      title={name}
      leftItems={[
        {
          key: "dateStart",
          icon: (
            <CalendarOutlined
              style={{
                color: "#8C8C8C",
                alignSelf: "center",
                fontSize: "18px",
              }}
            />
          ),
          value:
            formatDate(dateStart, "YYYY-MM-DD", "DD. MMM, YYYY") ??
            t("error.notPresent"),
        },
      ]}
      image={{
        firstInitialFullValue: name,
        id: id,
      }}
      centerItems={[
        {
          key: "hours",
          label: t("workspaceProjects.hours"),
          value: totalHours,
        },
        {
          key: "days",
          label: t("workspaceProjects.days"),
          value: totalDays,
        },
      ]}
      rightItems={[
        {
          key: "dateEnd",
          icon: (
            <FieldTimeOutlined
              style={{
                color: "#8C8C8C",
                alignSelf: "center",
                fontSize: "18px",
              }}
            />
          ),
          value:
            formatDate(dateEnd, "YYYY-MM-DD", "DD. MMM, YYYY") ??
            t("error.notPresent"),
        },
        {
          key: "employees",
          icon: (
            <TeamOutlined
              style={{
                color: "#8C8C8C",
                alignSelf: "center",
                fontSize: "18px",
              }}
            />
          ),
          value: employeeCount,
        },
        {
          key: "address",
          icon: (
            <UserOutlined
              style={{
                color: "#8C8C8C",
                alignSelf: "center",
                fontSize: "18px",
              }}
            />
          ),
          value: projectLead ? (
            <CopyToClipboard title={t("common.clickToCopy")}>
              {formattedProjectLead}
            </CopyToClipboard>
          ) : (
            formattedProjectLead
          ),
        },
      ]}
    />
  );
}
