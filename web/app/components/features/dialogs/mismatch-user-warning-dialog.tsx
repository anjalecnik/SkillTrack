import { useNavigate } from "@remix-run/react";
import { t } from "i18next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { WarningDialog } from "~/components/common";
import { IWorkspaceData } from "~/types";
import { useIsAuthenticatedUserFromEmail } from "~/hooks";

interface IMismatchUserWarningDialogProps {
  workspaceUserAcc?: IWorkspaceData;
  isUserFromMail?: boolean;
  setIsPlanAbsenceDialogOpen?: Dispatch<SetStateAction<boolean>>;
  setIsMoreToReportDialogOpen?: Dispatch<SetStateAction<boolean>>;
}

export function MismatchUserWarningDialog({
  workspaceUserAcc,
  isUserFromMail,
  setIsMoreToReportDialogOpen,
  setIsPlanAbsenceDialogOpen,
}: IMismatchUserWarningDialogProps) {
  const navigate = useNavigate();
  const [isUserWarningDialogOpen, setIsUserWarningDialogOpen] = useState(false);

  const isAuthUserFromMail = useIsAuthenticatedUserFromEmail(
    "id",
    workspaceUserAcc?.id
  );

  const isAuthUserSameAsEmailUser = workspaceUserAcc
    ? isAuthUserFromMail
    : true;

  const handleOnCloseWarningDialog = () => {
    setIsUserWarningDialogOpen(false);
    navigate("/user-hub");
  };

  useEffect(() => {
    if (!isAuthUserSameAsEmailUser) {
      setIsUserWarningDialogOpen(true);
      setIsMoreToReportDialogOpen?.(false);
      setIsPlanAbsenceDialogOpen?.(false);
    }
  }, [
    isAuthUserSameAsEmailUser,
    setIsMoreToReportDialogOpen,
    setIsPlanAbsenceDialogOpen,
  ]);

  useEffect(() => {
    if (isUserFromMail) {
      setIsUserWarningDialogOpen(true);
    }
  }, [isUserFromMail]);

  return (
    <WarningDialog
      open={isUserWarningDialogOpen}
      onClose={handleOnCloseWarningDialog}
      onClick={() => navigate(`/logout`)}
      submitButtonText={t("menu.logout")}
      title={t("error.userMismatchTitle")}
      id={workspaceUserAcc ? workspaceUserAcc.id : null}
    >
      {t("error.userMismatch")}
    </WarningDialog>
  );
}
