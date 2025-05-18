import {
  TableRow,
  TableCell,
  Typography,
  Tooltip,
  AvatarGroup,
  Chip,
  Checkbox,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  Flex,
  FlexColumn,
  CheckboxPaginatedTable,
  Avatar,
  AlertDialog,
} from "~/components/common";
import {
  IProject,
  ITableMeta,
  WorkspaceProjectUserRole,
  WorkspaceProjectStatus,
  IProjectParticipant,
  SearchParam,
} from "~/types";
import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { formatDate, fullNameFormatter } from "~/util";
import { WORKSPACE_HUB_PATH } from "~/constants";

interface IProjectTableProps {
  items: IProject[];
  meta?: ITableMeta;
  isLoading?: boolean;
  onItemClick: (id: number) => void;
  onSelectAllClick: (
    event: React.ChangeEvent<HTMLInputElement>,
    items: IProject[]
  ) => void;
  onCheckboxClick: (event: React.MouseEvent<unknown>, id: number) => void;
  selected: number[];
}

export function ProjectTable({
  items,
  meta,
  isLoading,
  onItemClick,
  onSelectAllClick,
  onCheckboxClick,
  selected,
}: IProjectTableProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  function handleAvatarGroupClick(project: IProject) {
    setSelectedProject(project);
    setOpenDialog(true);
  }

  function handleUserClick(participant: IProjectParticipant) {
    navigate(`${WORKSPACE_HUB_PATH}/employees/${participant.id}`);
  }

  return (
    <>
      <CheckboxPaginatedTable
        rowCount={items.length}
        numSelected={selected.length}
        onSelectAllClick={(e) => onSelectAllClick(e, items)}
        isLoading={isLoading}
        headers={[
          {
            children: t("workspaceProjects.project"),
            sort: true,
            param: "name",
          },
          {
            children: t("workspaceProjects.startDate"),
            sort: true,
            param: "dateStart",
          },
          {
            children: t("workspaceProjects.dueDate"),
            sort: true,
            param: "dateEnd",
          },
          {
            children: t("workspaceProjects.employees"),
          },
          {
            children: t("workspaceProjects.status"),
            param: SearchParam.Statuses,
            filter: {
              options: [
                {
                  value: WorkspaceProjectStatus.Active,
                  label: t("workspaceProjects.active"),
                },
                {
                  value: WorkspaceProjectStatus.Inactive,
                  label: t("workspaceProjects.inactive"),
                },
                {
                  value: WorkspaceProjectStatus.Future,
                  label: t("workspaceProjects.future"),
                },
              ],
              multiple: true,
              param: SearchParam.Statuses,
            },
          },
        ]}
        render={(item) => {
          const projectLead = item.participants?.find(
            (participant) =>
              participant.projectRole === WorkspaceProjectUserRole.Lead
          );
          const isItemSelected = selected.indexOf(item.id) !== -1;

          return (
            <Tooltip
              title={t("workspaceProjects.editProjectDetails")}
              placement="top"
              key={item.id}
            >
              <TableRow
                key={item.id}
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => onItemClick(item.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    onClick={(event) => onCheckboxClick(event, item.id)}
                  />
                </TableCell>
                <TableCell>
                  <Flex alignItems="center" gap="10px">
                    <Avatar avatarId={item.id} name={item.name} size="40px" />
                    <FlexColumn>
                      <Typography>{item.name}</Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.grey[500],
                        }}
                      >
                        {projectLead
                          ? `${projectLead.name} ${projectLead.surname}`
                          : "/"}
                      </Typography>
                    </FlexColumn>
                  </Flex>
                </TableCell>
                <TableCell>
                  {formatDate(item.dateStart, "YYYY-MM-DD", "DD. MMM, YYYY") ??
                    t("error.notPresent")}
                </TableCell>
                <TableCell>
                  {formatDate(item.dateEnd, undefined, "DD. MMM, YYYY") ??
                    t("error.notPresent")}
                </TableCell>
                <TableCell>
                  <Flex>
                    <Tooltip
                      placement="top"
                      title={t("workspaceProjects.clickToSeeEmployees", {
                        length: item.participants?.length ?? 0,
                      })}
                    >
                      <AvatarGroup
                        max={4}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAvatarGroupClick(item);
                        }}
                      >
                        {item.participants?.map((participant) => (
                          <Avatar
                            avatarId={participant.id}
                            key={participant.id}
                            size="40px"
                            name={`${participant.name} ${participant.surname}`}
                          />
                        ))}
                      </AvatarGroup>
                    </Tooltip>
                  </Flex>
                </TableCell>
                <TableCell>
                  {item.status === WorkspaceProjectStatus.Active && (
                    <Chip
                      label={t("workspaceProjects.active")}
                      color="success"
                      size="small"
                      variant="outlined"
                    />
                  )}
                  {item.status === WorkspaceProjectStatus.Inactive && (
                    <Chip
                      label={t("workspaceProjects.inactive")}
                      color="error"
                      size="small"
                      variant="outlined"
                    />
                  )}
                  {item.status === WorkspaceProjectStatus.Future && (
                    <Chip
                      label={t("workspaceProjects.future")}
                      color="primary"
                      size="small"
                      variant="outlined"
                    />
                  )}
                </TableCell>
              </TableRow>
            </Tooltip>
          );
        }}
        items={items}
        meta={meta}
      />
      <AlertDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedProject(null);
        }}
        title={t("workspaceProjects.projectEmployees")}
      >
        <FlexColumn>
          {selectedProject?.participants &&
            selectedProject.participants.map((participant) => (
              <Flex
                key={participant.id}
                padding="15px"
                gap="20px"
                alignItems="center"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: theme.palette.grey[100],
                  },
                }}
                onClick={() => handleUserClick(participant)}
              >
                <Avatar
                  avatarId={participant.id}
                  name={`${participant.name} ${participant.surname}`}
                  size="40px"
                />
                <Typography>{fullNameFormatter(participant)}</Typography>
                <Typography variant="body2">
                  {participant.projectRole}
                </Typography>
              </Flex>
            ))}
        </FlexColumn>
      </AlertDialog>
    </>
  );
}
