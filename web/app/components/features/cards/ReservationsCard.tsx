import { CardLayout } from "~/components/layout";
import { OfficesTable, ReservationsCardHeader } from "~/components/features";
import { Dispatch, SetStateAction } from "react";
import { IOffice, PaginatedResponse } from "~/types";
import { useNavigate } from "@remix-run/react";
import { useIsAdminRoute, useNavigationState } from "~/hooks";

interface IReservationsCardProps {
  offices: PaginatedResponse<IOffice> | null;
  setSelectedOffice?: Dispatch<SetStateAction<IOffice | undefined>>;
  setOfficePopupOpen?: Dispatch<SetStateAction<boolean>>;
  setDeleteOfficePopupOpen?: Dispatch<SetStateAction<boolean>>;
}

export function ReservationsCard({
  offices,
  setSelectedOffice,
  setOfficePopupOpen,
  setDeleteOfficePopupOpen,
}: IReservationsCardProps) {
  const navigate = useNavigate();
  const { isLoading } = useNavigationState();
  const isAdminRoute = useIsAdminRoute();

  const handleAddOfficePopup = () => {
    setSelectedOffice?.(undefined);
    setOfficePopupOpen?.(true);
  };

  const handleEditClick = (e: React.MouseEvent<unknown>, office: IOffice) => {
    e.stopPropagation();
    setSelectedOffice?.(office);
    setOfficePopupOpen?.(true);
  };

  const handleDeleteClick = (e: React.MouseEvent<unknown>, office: IOffice) => {
    e.stopPropagation();
    setSelectedOffice?.(office);
    setDeleteOfficePopupOpen?.(true);
  };

  const handleClick = (office: IOffice) => {
    // building 0 and floor 0 always exist
    navigate(`${office.id}/floor/${office.plan.buildings[0].floors[0].name}`, {
      replace: true,
    });
  };

  return (
    <CardLayout id="card">
      <ReservationsCardHeader onAddClick={handleAddOfficePopup} />
      <OfficesTable
        items={offices?.data ?? []}
        meta={{
          total: offices?.meta?.total,
          page: offices?.meta?.page,
          limit: 10,
        }}
        onItemClick={handleClick}
        onCreateClick={isAdminRoute ? handleAddOfficePopup : undefined}
        onEditClick={isAdminRoute ? handleEditClick : undefined}
        onDeleteClick={isAdminRoute ? handleDeleteClick : undefined}
        isLoading={isLoading}
      />
    </CardLayout>
  );
}
