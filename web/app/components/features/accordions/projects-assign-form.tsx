import {
  IProject,
  IProjectUserResponse,
  IWorkspaceEmployeeFormCommonProps,
  WorkspaceProjectUserRole,
} from "~/types";
import { projectAssignFormSchema as schema } from "~/schemas";
import { useTranslation } from "react-i18next";
import {
  Flex,
  FlexColumn,
  IconButton,
  PaddedFlexColumn,
  FormWrapper,
  FormArray,
  FormAutocompleteInput,
  FormRemoveButton,
  FormAddButton,
  FormError,
  FormCheckbox,
  FormAccordion,
} from "~/components/common";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

type ProjectFormArray = Omit<IProjectUserResponse, "name" | "role"> & {
  isProjectLead: string | undefined;
};

export interface IProjectAssignFormProps
  extends IWorkspaceEmployeeFormCommonProps {
  workspaceProjects: IProject[];
}

export function ProjectAssignForm({
  lastResult,
  workspaceUser,
  workspaceProjects,
  open,
  onAccordionClick,
  onCancelClick,
  intent,
  isLoading,
  isCancelPressed,
}: IProjectAssignFormProps) {
  const { t } = useTranslation();
  const [selectedProjectIds, setSelectedProjectIds] = useState<number[]>([]);
  const handleProjectChange = (value: number, index: number) => {
    setSelectedProjectIds((prev) => {
      const updatedProjects = [...prev];
      updatedProjects[index] = value;
      return updatedProjects;
    });
  };

  const projects = workspaceUser.projects?.map((project) => ({
    id: project.id,
    isProjectLead:
      project.role === WorkspaceProjectUserRole.Lead ? "on" : undefined,
  }));

  const description =
    workspaceUser?.projects?.map((project) => project.name).join(", ") ||
    t("workspaceEmployees.projectsSubtitle");

  const workspaceProjectsOptions = workspaceProjects.filter(
    (project) => !selectedProjectIds.includes(project.id)
  );

  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`project-assign-form-${isLoading}-${isCancelPressed}`}
      shouldValidate="onBlur"
      intent={intent}
    >
      <FormAccordion
        title={t("workspaceEmployees.projects")}
        desc={description}
        open={open}
        onAccordionClick={() => onAccordionClick(intent)}
        isLoading={isLoading}
        onCancelClick={onCancelClick}
        borderTop
      >
        <PaddedFlexColumn>
          <FormArray<ProjectFormArray>
            fieldName="projects"
            defaultValue={projects}
            render={(item, index) => {
              const selectedProject =
                item && workspaceProjects.find((p) => p.id === Number(item.id));
              return (
                <FlexColumn alignItems="start" gap="10px" key={index}>
                  <Flex gap="15px" alignItems="center" sx={{ width: "100%" }}>
                    <FormAutocompleteInput<IProject>
                      fieldName={`projects[${index}].id`}
                      label={t("workspaceEmployees.project")}
                      options={workspaceProjectsOptions}
                      defaultValue={selectedProject!}
                      required
                      getOptionLabel={(option) => option?.name ?? ""}
                      containerProps={{ flex: 4 }}
                      onChange={(e, value) => {
                        if (typeof value === "number") {
                          handleProjectChange(value, index);
                        }
                      }}
                    />
                    <FormRemoveButton
                      fieldName="projects"
                      index={index}
                      size="large"
                      type="submit"
                      sx={{ marginTop: "25px" }}
                      color="default"
                      ButtonComponent={IconButton}
                    >
                      <DeleteOutlined />
                    </FormRemoveButton>
                  </Flex>
                  <FormCheckbox
                    fieldName={`projects[${index}].isProjectLead`}
                    defaultValue={item?.isProjectLead === "on"}
                    label={t("workspaceEmployees.projectLead")}
                    labelPlacement="end"
                    sx={{ ml: "1px" }}
                  />
                </FlexColumn>
              );
            }}
          />
          <FormError fieldName="projects" />
          <FormAddButton
            fieldName="projects"
            disabled={workspaceProjects.length === selectedProjectIds.length}
          >
            {t("workspaceEmployees.addProject")}
          </FormAddButton>
        </PaddedFlexColumn>
      </FormAccordion>
    </FormWrapper>
  );
}
