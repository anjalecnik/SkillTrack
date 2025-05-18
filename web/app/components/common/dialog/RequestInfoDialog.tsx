import {
  ActivityStatus,
  ActivityType,
  getActivityTypeLabel,
  IActivity,
  MoreToReportEditRequestType,
  RequestAction,
} from "~/types";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Flex, FlexColumn, FormDialog } from "~/components/common";
import { t } from "i18next";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  getActivityTypeDescription,
  getActivityTypeTableCell,
} from "~/mappers";
import { MoreToReportEditRequest } from "~/util";

export interface IRequestInfoDialogProps extends MoreToReportEditRequestType {
  open: boolean;
  requests: IActivity[];
  setSelectedRequests: Dispatch<SetStateAction<IActivity[]>>;
}

export function RequestInfoDialog({
  open,
  requests,
  setSelectedRequests,
  setIsRequestInfoDialogOpen,
  setIsEditing,
  setSelectedMoreToReportType,
  setDefaultMoreToReportValues,
  setIsMoreToReportDialogOpen,
  setDefaultMoreToReportProject,
}: IRequestInfoDialogProps) {
  const [activityStatus, setActivityStatus] = useState<ActivityStatus>();
  const [selectedRequest, setSelectedRequest] = useState<IActivity | null>(
    null
  );

  const requestActions = requests[0]?._embedded.actions;

  // set selected request right away if there is only one so we dont have to show summary table with one item
  useEffect(() => {
    if (requests.length === 1) {
      setSelectedRequest(requests[0]);
    }
  }, [requests]);

  const requestIncludesActivityAction = (action: RequestAction) => {
    return requestActions?.some((a) => a === action) ?? false;
  };

  const handleEdit = (activity: IActivity) =>
    MoreToReportEditRequest.handleBusinessTripEdit(activity, {
      setIsRequestInfoDialogOpen,
      setIsEditing,
      setSelectedMoreToReportType,
      setDefaultMoreToReportValues,
      setIsMoreToReportDialogOpen,
      setDefaultMoreToReportProject,
    });

  const handleOnClose = () => {
    setIsRequestInfoDialogOpen(false);
    setSelectedRequests([]);
    setSelectedRequest(null);
  };

  return (
    <FormDialog
      open={open}
      onClose={handleOnClose}
      title={
        <Flex alignItems={"center"}>
          {selectedRequest && requests.length > 1 && (
            <IconButton
              sx={{ mr: "10px" }}
              onClick={() => setSelectedRequest(null)}
            >
              <ArrowLeftOutlined />
            </IconButton>
          )}
          {getActivityTypeLabel(requests[0]?.activityType)}
        </Flex>
      }
      footer={
        requestActions &&
        selectedRequest && (
          <>
            <input type="hidden" name="action" value={activityStatus} />
            <input type="hidden" name="id" value={selectedRequest.id} />
            <input
              type="hidden"
              name="employeeId"
              value={selectedRequest._embedded.workspaceUser.id}
            />
            {selectedRequest.activityType === ActivityType.BusinessTrip && (
              <Button
                variant="outlined"
                onClick={() => handleEdit(selectedRequest)}
              >
                {t("workspaceRequests.edit")}
              </Button>
            )}
            {requestIncludesActivityAction(RequestAction.Cancel) && (
              <Button
                variant="contained"
                color="error"
                type="submit"
                value="delete"
                name="intent"
                onClick={() => setActivityStatus(ActivityStatus.Canceled)}
              >
                {t("userHub.cancelActivity")}
              </Button>
            )}
            {requestIncludesActivityAction(RequestAction.Reject) && (
              <Button
                variant="outlined"
                type="submit"
                value="updateStatus"
                name="intent"
                onClick={() => setActivityStatus(ActivityStatus.Rejected)}
              >
                {t("workspaceRequests.decline")}
              </Button>
            )}

            {requestIncludesActivityAction(RequestAction.Approve) && (
              <Button
                variant="contained"
                type="submit"
                value="updateStatus"
                name="intent"
                onClick={() => setActivityStatus(ActivityStatus.Approved)}
              >
                {t("workspaceRequests.approve")}
              </Button>
            )}
          </>
        )
      }
    >
      <FlexColumn padding="20px">
        {selectedRequest ? (
          <>
            <FlexColumn gap="20px">
              <FlexColumn>
                <Typography
                  variant="body1"
                  sx={{
                    color: "grey.500",
                  }}
                >
                  {t("workspaceRequests.requestType")}
                </Typography>
                <Typography variant="h5">
                  {getActivityTypeLabel(selectedRequest.activityType)}
                </Typography>
              </FlexColumn>
              <FlexColumn>
                <Typography
                  variant="body1"
                  sx={{
                    color: "grey.500",
                  }}
                >
                  {t("workspaceRequests.project")}
                </Typography>
                <Typography variant="h5">
                  {selectedRequest.projectName ?? t("error.notPresent")}
                </Typography>
              </FlexColumn>
              {getActivityTypeDescription(selectedRequest)}

              <FlexColumn>
                <Typography
                  variant="body1"
                  sx={{
                    color: "grey.500",
                    paddingBottom: "5px",
                  }}
                >
                  {t("userHub.explanation")}
                </Typography>
                <Typography variant="h5" sx={{ wordBreak: "break-all" }}>
                  {selectedRequest.description ?? t("error.notPresent")}
                </Typography>
              </FlexColumn>
            </FlexColumn>
          </>
        ) : (
          <Table>
            <TableBody>
              {requests &&
                requests.map((request, index) => (
                  <Tooltip title={t("userHub.clickToViewDetails")} key={index}>
                    <TableRow
                      onClick={() => setSelectedRequest(request)}
                      sx={{ cursor: "pointer" }}
                      key={index}
                    >
                      {getActivityTypeTableCell(request)}
                    </TableRow>
                  </Tooltip>
                ))}
            </TableBody>
          </Table>
        )}
      </FlexColumn>
    </FormDialog>
  );
}
