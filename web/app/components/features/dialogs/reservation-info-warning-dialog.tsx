import { t } from "i18next";
import { AlertDialog } from "~/components/common";
import { IDesk, IReservation, IWorkspaceUser } from "~/types";
import { ReservationInfoDialog } from "./reservation-info-dialog";
import { Dispatch, SetStateAction } from "react";

interface IReservationInfoWarningDialogProps {
  loaderData: {
    reservations: IReservation[];
    workspaceUser: IWorkspaceUser;
  };
  selectedItem?: IDesk;
  open: boolean;
  setReservationInfoPopupOpen: Dispatch<SetStateAction<boolean>>;
}

export function ReservationInfoWarningDialog({
  loaderData,
  selectedItem,
  open,
  setReservationInfoPopupOpen,
}: IReservationInfoWarningDialogProps) {
  const { reservations, workspaceUser } = loaderData;

  return (
    <AlertDialog
      open={open}
      onClose={() => setReservationInfoPopupOpen(false)}
      title={t("workspaceReservations.reservation")}
    >
      {selectedItem && (
        <ReservationInfoDialog
          reservation={reservations.find(
            (reservation) => reservation.deskId === selectedItem.uuid
          )}
          workspaceUser={workspaceUser as IWorkspaceUser}
          item={selectedItem}
        />
      )}
    </AlertDialog>
  );
}
