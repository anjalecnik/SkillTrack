import { t } from "i18next";
import { Button, FormDialog } from "~/components/common";
import { FormProvider, SubmissionResult, useForm } from "@conform-to/react";
import { ProjectParticipantsEditForm } from "~/components/features";
import { useNavigation } from "@remix-run/react";
import {
  IWorkspaceUser,
  NavigationState,
  WorkspaceProjectUserRole,
  WorkspaceProjectAccordions as Accordions,
  IProject,
} from "~/types";
import { parseWithZod } from "@conform-to/zod";
import { employeeAssignFormSchema } from "~/schemas";
import { Dispatch, SetStateAction } from "react";

interface IAddEmployeeToProjectDialogFormProps {
  lastResult?: SubmissionResult<string[]> | null;
  selectedEmployeeData: IWorkspaceUser | null;
  projects: IProject[];
  openParticipantPopup: boolean;
  setOpenParticipantPopup: Dispatch<SetStateAction<boolean>>;
}

export function AddEmployeeToProjectDialogForm({
  lastResult,
  selectedEmployeeData,
  openParticipantPopup,
  setOpenParticipantPopup,
  projects,
}: IAddEmployeeToProjectDialogFormProps) {
  const { state } = useNavigation();
  const isLoading =
    state === NavigationState.Loading || state === NavigationState.Submitting;

  const [form] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: employeeAssignFormSchema });
    },
    shouldRevalidate: "onBlur",
    defaultValue: {
      projects: selectedEmployeeData?.projects?.map((project) => ({
        id: project.id,
        isProjectLead:
          project.role === WorkspaceProjectUserRole.Lead ? "on" : undefined,
      })),
    },
    id: `project-participants-edit-form-${openParticipantPopup}`,
  });
  return (
    <FormDialog
      open={openParticipantPopup}
      onClose={() => setOpenParticipantPopup(false)}
      title={t("workspaceProjects.projectEmployees")}
      formId={form.id}
      defaultAction={{
        name: "intent",
        value: Accordions.Employees,
      }}
      footer={
        <>
          <input type="hidden" name="intent" value={Accordions.Employees} />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            loading={isLoading}
          >
            {t("common.save")}
          </Button>
        </>
      }
    >
      <FormProvider context={form.context}>
        <ProjectParticipantsEditForm
          formId={form.id}
          workspaceProjects={projects || []}
          workspaceUser={selectedEmployeeData}
        />
      </FormProvider>
    </FormDialog>
  );
}
