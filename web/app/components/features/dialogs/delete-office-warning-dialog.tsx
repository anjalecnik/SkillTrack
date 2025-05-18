import { Dispatch, SetStateAction } from "react";
import { WarningDialog } from "~/components/common";
import { IOffice } from "~/types";
import { useNavigationState } from "~/hooks";

interface IDeleteOfficeWarningDialog {
  selectedOffice?: IOffice;
  setDeleteOfficePopupOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export function DeleteOfficeWarningDialog({
  selectedOffice,
  setDeleteOfficePopupOpen,
  open,
}: IDeleteOfficeWarningDialog) {
  const { isLoading } = useNavigationState();
  return (
    <WarningDialog
      open={open}
      onClose={() => setDeleteOfficePopupOpen(false)}
      id={selectedOffice?.id || null}
      isLoading={isLoading}
    />
  );
}
