import { t } from "i18next";
import { Button, FormDialog } from "~/components/common";
import { FormProvider, SubmissionResult, useForm } from "@conform-to/react";
import { AddProjectForm } from "./add-project-form";
import { parseWithZod } from "@conform-to/zod";
import { addProjectAndDetailsSchema, addProjectFormSchema } from "~/schemas";
import { z } from "zod";
import { useState } from "react";
import { useNavigationState } from "~/hooks";

interface IAddProjectDialogFormProps {
  open: boolean;
  lastResult?: SubmissionResult<string[]> | null;
  selected: number[];
  onClose: () => void;
}

interface ILoadingStatesProps {
  create: boolean;
  details: boolean;
}

export function AddProjectDialogForm({
  lastResult,
  selected,
  open,
  onClose,
}: IAddProjectDialogFormProps) {
  const [loadingState, setLoadingState] = useState<ILoadingStatesProps>({
    details: false,
    create: false,
  });
  const { isLoading } = useNavigationState();

  const [form] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: z.discriminatedUnion("intent", [
          addProjectFormSchema,
          addProjectAndDetailsSchema,
        ]),
      });
    },
    shouldValidate: "onSubmit",
    id: `project-form-${selected.join("-")}`,
  });
  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title={t("workspaceProjects.addNewProject")}
      formId={form.id}
      footer={
        <>
          <Button
            variant="contained"
            color="primary"
            value="create"
            name="intent"
            type="submit"
            loading={isLoading && loadingState.create}
            disabled={isLoading}
            onClick={() => setLoadingState({ details: false, create: true })}
          >
            {t("workspaceProjects.addProject")}
          </Button>
        </>
      }
    >
      <FormProvider context={form.context}>
        <AddProjectForm formId={form.id} />
      </FormProvider>
    </FormDialog>
  );
}
