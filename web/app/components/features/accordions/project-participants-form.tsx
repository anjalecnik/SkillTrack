import { SubmissionResult } from "@conform-to/react";
import {
  IProject,
  IUser,
  WorkspaceProjectAccordions,
  WorkspaceProjectUserRole,
} from "~/types";
import { projectParticipantsFormSchema as schema } from "~/schemas";
import { useTranslation } from "react-i18next";
import { Chip, Typography } from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import {
  Flex,
  FlexColumn,
  Button,
  PaddedFlexColumn,
  FormWrapper,
  FormAutocompleteInput,
  FormAccordion,
} from "~/components/common";
import { useEffect, useRef } from "react";

interface IProjectParticipantsFormProps {
  lastResult?: SubmissionResult<string[]> | null;
  project?: IProject;
  users: IUser[];
  open: boolean;
  onAccordionClick: (id: WorkspaceProjectAccordions) => void;
  intent: WorkspaceProjectAccordions;
  isLoading?: boolean;
  onEmployeeChange: (employeeId: number) => void;
  onAddClick: () => void;
  onEditClick: (participantId: number) => void;
  onClear: () => void;
  selectedEmployeeId?: number | "";
}

export function ProjectParticipantsForm({
  lastResult,
  project,
  users,
  open,
  onAccordionClick,
  intent,
  isLoading,
  onEmployeeChange,
  onAddClick,
  onEditClick,
  onClear,
  selectedEmployeeId,
}: IProjectParticipantsFormProps) {
  const keyRef = useRef(1);
  const { t } = useTranslation();

  const projectLeads = project?.participants?.filter(
    (participant) => participant.projectRole === WorkspaceProjectUserRole.Lead
  );

  const projectMembers = project?.participants?.filter(
    (participant) => participant.projectRole === WorkspaceProjectUserRole.Member
  );

  const availableUsers = users.filter(
    (user) =>
      !project?.participants?.find((participant) => participant.id === user.id)
  );

  useEffect(() => {
    keyRef.current++;
  }, [availableUsers]);

  return (
    <FormWrapper
      id="project-participans-form"
      lastResult={lastResult}
      schema={schema}
      shouldValidate="onSubmit"
      intent={intent}
    >
      <FormAccordion
        title={t("workspaceProjects.employees")}
        desc={t("workspaceProjects.employeesSubtitle")}
        open={open}
        isLoading={isLoading}
        displaySaveButton={false}
        onAccordionClick={() => onAccordionClick(intent)}
        borderTop
      >
        <PaddedFlexColumn>
          <Flex justifyContent="space-between" alignItems="end" gap="20px">
            <FormAutocompleteInput<IUser>
              fieldName="participantId"
              key={keyRef.current}
              label={t("workspaceProjects.addEmployee")}
              options={availableUsers}
              defaultValue={
                availableUsers.find((e) => e.id === selectedEmployeeId)!
              }
              getOptionLabel={(option) => `${option?.name} ${option?.surname}`}
              onClear={onClear}
              onChange={(_, value) => {
                onEmployeeChange(value as number);
              }}
              containerProps={{ sx: { flex: 1 } }}
            />
            <Button
              variant="outlined"
              color="primary"
              sx={{
                height: "41px",
              }}
              startIcon={<PlusOutlined />}
              onClick={onAddClick}
            >
              {t("common.add")}
            </Button>
          </Flex>
          <FlexColumn gap="20px">
            <Typography variant="h6">
              {t("workspaceProjects.projectLeads")}
            </Typography>
            {projectLeads && projectLeads.length > 0 ? (
              <Flex gap="10px">
                {projectLeads.map((lead) => (
                  <Chip
                    key={lead.id}
                    label={`${lead.name} ${lead.surname}`}
                    onClick={() => onEditClick(lead.id)}
                    sx={{
                      cursor: "pointer",
                      ":hover": { backgroundColor: "grey.300" },
                    }}
                  />
                ))}
              </Flex>
            ) : (
              <Typography variant="body2">
                {t("workspaceProjects.noProjectLeads")}
              </Typography>
            )}
          </FlexColumn>
          <FlexColumn gap="20px">
            <Typography variant="h6">
              {t("workspaceProjects.projectMembers")}
            </Typography>
            {projectMembers && projectMembers.length > 0 ? (
              <Flex gap="10px" sx={{ flexWrap: "wrap" }}>
                {projectMembers.map((member) => (
                  <Chip
                    key={member.id}
                    label={`${member.name} ${member.surname}`}
                    onClick={() => onEditClick(member.id)}
                    sx={{
                      cursor: "pointer",
                      ":hover": { backgroundColor: "grey.300" },
                    }}
                  />
                ))}
              </Flex>
            ) : (
              <Typography variant="body2">
                {t("workspaceProjects.noProjectMembers")}
              </Typography>
            )}
          </FlexColumn>
        </PaddedFlexColumn>
      </FormAccordion>
    </FormWrapper>
  );
}
