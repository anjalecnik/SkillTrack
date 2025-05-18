import { CardLayout } from "~/components/layout";
import { PositionsCardHeader, WorkPositionTable } from "~/components/features";
import { useGoBackToPage, useNavigationState } from "~/hooks";
import { IPositionResponse, PaginatedResponse } from "~/types";
import { Dispatch, SetStateAction, useEffect } from "react";

interface IPositionsCardProps {
  positions: PaginatedResponse<IPositionResponse> | null;
  setPositionPopupOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedItem: Dispatch<SetStateAction<IPositionResponse | null>>;
  setDeletePopupOpen: Dispatch<SetStateAction<boolean>>;
}

export function PositionsCard({
  positions,
  setPositionPopupOpen,
  setSelectedItem,
  setDeletePopupOpen,
}: IPositionsCardProps) {
  const { isLoading } = useNavigationState();
  const goBackToPage = useGoBackToPage();

  function handleAddClick() {
    setPositionPopupOpen(true);
    setSelectedItem(null);
  }

  function handleEditClick(item: IPositionResponse) {
    setPositionPopupOpen(true);
    setSelectedItem(item);
  }

  function handleDeleteClick(item: IPositionResponse) {
    setSelectedItem(item);
    setDeletePopupOpen(true);
  }

  useEffect(() => {
    goBackToPage(positions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions]);

  return (
    <CardLayout>
      <PositionsCardHeader onAddClick={handleAddClick} />
      <WorkPositionTable
        items={positions?.data || []}
        meta={{
          total: positions?.meta?.total,
          page: positions?.meta?.page,
          limit: 10,
        }}
        isLoading={isLoading}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </CardLayout>
  );
}
