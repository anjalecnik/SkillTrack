import {
  FormId,
  getInputProps,
  getSelectProps,
  useFormMetadata,
} from "@conform-to/react";
import { IProject, IWorkspaceUser, WorkspaceProjectAccordions } from "~/types";
import { useTranslation } from "react-i18next";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Autocomplete,
  Flex,
  FlexColumn,
  IconButton,
  PaddedFlexColumn,
} from "~/components/common";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { fullNameFormatter } from "~/util";

interface IProjectParticipantsEditFormProps {
  workspaceProjects: IProject[];
  workspaceUser: IWorkspaceUser | null;
  formId: FormId<
    {
      intent: WorkspaceProjectAccordions.Employees;
      projects: {
        id: number;
        isProjectLead?: "on" | undefined;
      }[];
    },
    string[]
  >;
}

export function ProjectParticipantsEditForm({
  workspaceProjects,
  workspaceUser,
  formId,
}: IProjectParticipantsEditFormProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [selectedProjectIds, setSelectedProjectIds] = useState<number[]>([]);
  const form = useFormMetadata(formId);

  const handleProjectChange = (value: number, index: number) => {
    const selectedProjects = [...selectedProjectIds];
    selectedProjects[index] = value;
    setSelectedProjectIds(selectedProjects);
  };
  const fields = form.getFieldset();
  const projects = fields.projects.getFieldList();

  useEffect(() => {
    const updateProjectList = () => {
      const selectedProjects = projects.map((project) => {
        return Number(project.getFieldset().id.value);
      });

      if (
        JSON.stringify(selectedProjects) !== JSON.stringify(selectedProjectIds)
      ) {
        setSelectedProjectIds(selectedProjects);
      }
    };

    updateProjectList();
  }, [projects, selectedProjectIds]);

  const workspaceProjectsOptions = workspaceProjects.filter(
    (project, index) =>
      selectedProjectIds.length !== 0 &&
      project.id !== selectedProjectIds[index] &&
      !selectedProjectIds.includes(project.id)
  );

  return (
    <PaddedFlexColumn>
      <input type="hidden" name="userId" value={workspaceUser?.id} />
      <FlexColumn>
        <Typography
          variant="h5"
          sx={{
            wordBreak: "break-word",
            textWrap: "wrap",
            whiteSpace: "normal",
          }}
        >
          {fullNameFormatter(workspaceUser!)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#8C8C8C",
            wordBreak: "break-word",
            lineHeight: "20px",
          }}
        >
          {workspaceUser?.workPosition?.name}
        </Typography>
      </FlexColumn>
      {projects.map((project, index) => {
        const projectFields = project.getFieldset();
        const selectedProject = workspaceProjects.find(
          (p) => p.id === Number(projectFields.id.value)
        );

        return (
          <FlexColumn alignItems="start" gap="10px" key={project.key}>
            <Flex gap="15px" alignItems="end" sx={{ width: "100%" }}>
              <Autocomplete
                {...getSelectProps(projectFields.id)}
                key={projectFields.id.key}
                name={projectFields.id.name}
                label={t("workspaceEmployees.project")}
                required
                options={
                  selectedProject
                    ? [selectedProject, ...workspaceProjectsOptions]
                    : workspaceProjectsOptions
                }
                value={selectedProject}
                getOptionLabel={(option) => option?.name ?? ""}
                onChange={(e, value) => {
                  if (typeof value === "number") {
                    handleProjectChange(e.target.value, index);
                  }
                }}
                containerProps={{ sx: { flex: 1 } }}
              />
              <IconButton
                {...form.remove.getButtonProps({
                  name: fields.projects.name,
                  index,
                })}
                size="large"
                color="default"
                type="submit"
                sx={{ marginTop: "20px" }}
              >
                <DeleteOutlined />
              </IconButton>
            </Flex>
            <FormControlLabel
              control={
                <Checkbox
                  {...getInputProps(projectFields.isProjectLead, {
                    type: "checkbox",
                  })}
                  key={projectFields.isProjectLead.key}
                />
              }
              label={t("workspaceEmployees.projectLead")}
              labelPlacement="end"
              sx={{ ml: "1px" }}
            />
          </FlexColumn>
        );
      })}
      {!projects?.length && (
        <Typography variant="body1">
          {t("workspaceEmployees.noProjects")}
        </Typography>
      )}
      <Typography
        sx={{
          color: theme.palette.customColors.red.main,
        }}
      >
        {t(fields.projects.errors?.[0] ?? "")}
      </Typography>
    </PaddedFlexColumn>
  );
}
