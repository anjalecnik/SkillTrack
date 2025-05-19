import { SubmissionResult, useForm } from "@conform-to/react";
import { WarningDialog } from "~/components/common";
import { IPositionResponse } from "~/types";
import { deleteSchema as schema } from "~/schemas";
import { parseWithZod } from "@conform-to/zod";
import { useNavigationState } from "~/hooks";
import { Dispatch, SetStateAction } from "react";

interface IDeletePositionsWarningDialog {
  selectedItem: IPositionResponse | null;
  lastResult?: SubmissionResult<string[]> | null;
  positionPopupOpen: boolean;
  open: boolean;
  setSelectedItem: Dispatch<SetStateAction<IPositionResponse | null>>;
  setDeletePopupOpen: Dispatch<SetStateAction<boolean>>;
}

export function DeletePositionsWarningDialog({
  selectedItem,
  lastResult,
  positionPopupOpen,
  open,
  setSelectedItem,
  setDeletePopupOpen,
}: IDeletePositionsWarningDialog) {
  const { isLoading } = useNavigationState();

  const [form] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onSubmit",
    // Dynamic id to rerender the form when the popup is opened
    id: `work-position-form-${positionPopupOpen}`,
  });

  function handleDeleteCancel() {
    setDeletePopupOpen(false);
    setSelectedItem(null);
  }

  return (
    <WarningDialog
      formId={form.id}
      id={selectedItem?.id || null}
      isLoading={isLoading}
      open={open}
      onClose={handleDeleteCancel}
    />
  );
}
