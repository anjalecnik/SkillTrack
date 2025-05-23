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
  setIsMoreToReportDialogOpen,
  setIsPlanAbsenceDialogOpen,
  handleDailyReportClick,
  shouldShowPersonalRequestsCheckbox = true,
  shouldShowSearchBox = true,
}: RequestsCardProps) => {
  const { isLoading } = useNavigationState();

  return (
    <CardLayout sx={{ overflow: "visible" }}>
      <FlexColumn gap="30px" paddingBottom="20px">
        <RequestsCardHeader
          setIsMoreToReportDialogOpen={setIsMoreToReportDialogOpen}
          setIsPlanAbsenceDialogOpen={setIsPlanAbsenceDialogOpen}
          handleDailyReportClick={handleDailyReportClick}
          shouldShowPersonalRequestsCheckbox={
            shouldShowPersonalRequestsCheckbox
          }
          shouldShowSearchBox={shouldShowSearchBox}
        />
        <RequestsOverviewTable
          items={requests?._embedded?.requests ?? []}
          meta={{
            total: requests?.total,
            page: requests?.page,
            limit,
          }}
          isLoading={isLoading}
          disabledItemById={disabledItemById}
        />
      </FlexColumn>
    </CardLayout>
  );
};
