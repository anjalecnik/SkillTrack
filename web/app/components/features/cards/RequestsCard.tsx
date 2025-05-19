import { CardLayout } from "~/components/layout";
import { FlexColumn } from "~/components/common";
import { useNavigationState } from "~/hooks";
import {
  RequestsOverviewTable,
  RequestsCardHeader,
} from "~/components/features";
import { HalPaginatedResponse, IActivity, IRequestsResponse } from "~/types";
import { Dispatch, SetStateAction } from "react";

interface RequestsCardProps {
  limit: number;
  requests?: HalPaginatedResponse<IRequestsResponse>;
  disabledItemById?: number;
  setSelectedRequests: Dispatch<SetStateAction<IActivity[]>>;
  setIsRequestInfoDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsMoreToReportDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsPlanAbsenceDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleDailyReportClick: () => void;
  shouldShowPersonalRequestsCheckbox?: boolean;
  shouldShowSearchBox?: boolean;
}

export const RequestsCard = ({
  limit,
  requests,
  disabledItemById,
  setSelectedRequests,
  setIsRequestInfoDialogOpen,
  setIsMoreToReportDialogOpen,
  setIsPlanAbsenceDialogOpen,
  handleDailyReportClick,
  shouldShowPersonalRequestsCheckbox = true,
  shouldShowSearchBox = true
}: RequestsCardProps) => {
  const { isLoading } = useNavigationState();

  const handleRequestClick = async (request: IActivity) => {
    setSelectedRequests([request]);
    setIsRequestInfoDialogOpen(true);
  };

  return (
    <CardLayout sx={{ overflow: 'visible' }}>
      <FlexColumn gap="30px" paddingBottom="20px">
        <RequestsCardHeader
          setIsMoreToReportDialogOpen={setIsMoreToReportDialogOpen}
          setIsPlanAbsenceDialogOpen={setIsPlanAbsenceDialogOpen}
          handleDailyReportClick={handleDailyReportClick}
          shouldShowPersonalRequestsCheckbox={shouldShowPersonalRequestsCheckbox}
          shouldShowSearchBox={shouldShowSearchBox}
        />
        <RequestsOverviewTable
          items={requests?._embedded?.requests ?? []}
          meta={{
            total: requests?.total,
            page: requests?.page,
            limit,
          }}
          onItemClick={handleRequestClick}
          isLoading={isLoading}
          disabledItemById={disabledItemById}
        />
      </FlexColumn>
    </CardLayout>
  );
};
