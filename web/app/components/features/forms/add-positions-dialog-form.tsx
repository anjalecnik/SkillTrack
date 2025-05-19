import { t } from "i18next";
import { Button, FormDialog } from "~/components/common";
import { FormProvider, SubmissionResult, useForm } from "@conform-to/react";
import { WorkPositionForm } from "~/components/features";
import { useNavigationState } from "~/hooks";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import {
  workspacePositionCreateSchema,
  workspacePositionUpdateSchema,
} from "~/schemas";
import { IPositionResponse, PaginatedResponse } from "~/types";
import { Dispatch, SetStateAction } from "react";

interface IAddPositionsDialogFormProps {
  lastResult?: SubmissionResult<string[]> | null;
  selectedItem: IPositionResponse | null;
  positions: PaginatedResponse<IPositionResponse> | null;
  setPositionPopupOpen: Dispatch<SetStateAction<boolean>>;
  positionPopupOpen: boolean;
}

export function AddPositionsDialogForm({
  lastResult,
  selectedItem,
  positions,
  setPositionPopupOpen,
  positionPopupOpen,
}: IAddPositionsDialogFormProps) {
  const { isLoading } = useNavigationState();

  const [form] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: z.discriminatedUnion("intent", [
          workspacePositionCreateSchema,
          workspacePositionUpdateSchema,
        ]),
      });
    },
    shouldValidate: "onSubmit",
    defaultValue: {
      id: selectedItem?.id,
      name: selectedItem?.name,
      description: selectedItem?.description,
      level: selectedItem?.level,
      workPositionPromotionId: selectedItem?.workPromotion?.id,
    },
    // Dynamic id to rerender the form when the popup is opened
    id: `work-position-form-${positionPopupOpen}`,
  });

  return (
    <FormDialog
      open={positionPopupOpen}
      onClose={() => setPositionPopupOpen(false)}
      title={
        selectedItem?.id
          ? t("workspacePositions.editPosition")
          : t("workspacePositions.addNewPosition")
      }
      formId={form.id}
      footer={
        <>
          <Button
            variant="outlined"
            onClick={() => setPositionPopupOpen(false)}
            disabled={isLoading}
          >
            {t("common.cancel")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            value={selectedItem?.id ? "update" : "create"}
            name="intent"
            type="submit"
            loading={isLoading}
          >
            {t("common.save")}
          </Button>
        </>
      }
    >
      <FormProvider context={form.context}>
        <WorkPositionForm
          selectedItem={selectedItem}
          formId={form.id}
          workPositions={positions?.data || []}
        />
      </FormProvider>
    </FormDialog>
  );
}
