import { FormProvider, SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { t } from "i18next";
import { useState } from "react";
import { Button, FormDialog } from "~/components/common";
import { AddEmployeeForm } from "~/components/features";
import { addEmployeeFormSchema as schema } from "~/schemas";
import { useNavigationState } from "~/hooks";

interface IAddEmployeeDialogFormProps {
  open: boolean;
  onClose: () => void;
  lastResult?: SubmissionResult<string[]> | null;
}

interface ILoadingBtnStatesProps {
  details: boolean;
  create: boolean;
}

export function AddEmployeeDialogForm({
  open,
  onClose,
  lastResult,
}: IAddEmployeeDialogFormProps) {
  const [loadingState, setLoadingState] = useState<ILoadingBtnStatesProps>({
    details: false,
    create: false,
  });
  const { isLoading } = useNavigationState();

  const [form] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onSubmit",
  });

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title={t("workspaceEmployees.addNewEmployee")}
      formId={form.id}
      footer={
        <>
          <Button
            variant="contained"
            color="primary"
            value="create"
            name="intent"
            type="submit"
            data-testId="createEmployeeBtn"
            loading={isLoading && loadingState.create}
            disabled={isLoading}
            onClick={() => {
              setLoadingState({ details: false, create: true });
            }}
          >
            {t("common.create")}
          </Button>
        </>
      }
    >
      <FormProvider context={form.context}>
        <AddEmployeeForm formId={form.id} />
      </FormProvider>
    </FormDialog>
  );
}
