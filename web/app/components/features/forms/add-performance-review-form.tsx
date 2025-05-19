import { t } from "i18next";
import { Button, FormDialog, PaddedFlexColumn } from "~/components/common";
import { FormProvider, SubmissionResult, useForm } from "@conform-to/react";
import { useNavigationState } from "~/hooks";
import { parseWithZod } from "@conform-to/zod";
import { PerformanceReviewForm } from "./performance-review-form";
import { performanceReviewFormDialogSchema as schema } from "~/schemas/activities/performance-review-form-schema";
import { IActivityPerformanceReviewForm } from "~/types/interfaces/activity/activity-performance-review-form";
import { Dispatch, SetStateAction } from "react";
import { EditOutlined } from "@ant-design/icons";
import { IUser } from "~/types";

interface IAddPerformanceReviewDialogFormProps {
  employees: IUser[];
  lastResult?: SubmissionResult<string[]> | null;
  isEditing: boolean;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  isViewing: boolean;
  setIsViewing?: Dispatch<SetStateAction<boolean>>;
  defaultValues?: IActivityPerformanceReviewForm;
  onClose: (close?: boolean) => void;
}

export function AddPerformanceReviewDialogForm({
  employees,
  lastResult,
  isEditing,
  isViewing,
  isOpen,
  defaultValues,
  onClose,
  setIsEditing = () => {},
  setIsViewing = () => {},
}: IAddPerformanceReviewDialogFormProps) {
  const { isLoading } = useNavigationState();
  const [form] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: schema,
      });
    },
    shouldValidate: "onSubmit",
    defaultValue: {
      employeeId: defaultValues?.employeeId,
      year: defaultValues?.year,
      quartal: defaultValues?.quartal,
      answer1: defaultValues?.answer1,
      answer2: defaultValues?.answer2,
      answer3:
        defaultValues?.answer3 !== undefined
          ? String(defaultValues.answer3)
          : undefined,
      answer4:
        defaultValues?.answer4 !== undefined
          ? String(defaultValues.answer4)
          : undefined,
      activityId: defaultValues?.activityId,
    },
    id: `performance-review-form-${isOpen}`,
  });

  const closeAndResetForm = () => {
    onClose(true);
    form.reset();
  };

  return (
    <FormDialog
      open={isOpen}
      onClose={closeAndResetForm}
      title={(() => {
        if (isViewing) {
          return t("workspacePerformanceReviews.performanceReview");
        }
        if (isEditing) {
          return t("workspacePerformanceReviews.editPerformanceReview");
        }
        return t("workspacePerformanceReviews.addNewPerformanceReview");
      })()}
      formId={form.id}
      footer={
        isViewing ? (
          <Button
            variant="contained"
            color="primary"
            type="button"
            name="intent"
            startIcon={<EditOutlined />}
            onClick={() => {
              setIsEditing(true);
              setIsViewing(false);
            }}
            loading={isLoading}
          >
            {t("common.edit")}
          </Button>
        ) : (
          <>
            <Button
              name="intent"
              variant="outlined"
              onClick={closeAndResetForm}
              type="button"
              disabled={isLoading}
            >
              {t("common.cancel")}
            </Button>
            {!isEditing && (
              <Button
                variant="outlined"
                name="intent"
                value="createAndAddMoreDetails"
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                onClick={() => form.reset()}
              >
                {t("workspacePerformanceReviews.saveAndAddAnother")}
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              name="intent"
              value={isEditing ? "update" : "create"}
              loading={isLoading}
            >
              {t("common.save")}
            </Button>
          </>
        )
      }
    >
      <PaddedFlexColumn>
        <FormProvider context={form.context}>
          <PerformanceReviewForm
            employees={employees}
            defaultValues={defaultValues}
            isEditing={isEditing}
            isViewing={isViewing}
          />
        </FormProvider>
      </PaddedFlexColumn>
    </FormDialog>
  );
}
