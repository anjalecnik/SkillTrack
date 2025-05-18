import { Chip, TableCell, TableRow, Typography } from "@mui/material";
import { Form } from "@remix-run/react";
import { t } from "i18next";
import { useState } from "react";
import {
  Flex,
  FlexColumn,
  Avatar,
  PaginatedTable,
  MiniButton,
} from "~/components/common";
import {
  ActivityStatus,
  ActivityType,
  getActivityStatusLabel,
  getActivityTypeLabel,
  IActivity,
  RequestAction,
} from "~/types";
import { formatDateWithStartAndEnd, fullNameFormatter } from "~/util";

interface IRequestsOverviewTableProps {
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
  items: IActivity[];
  isLoading?: boolean;
  onItemClick?: (request: IActivity) => void;
  disabledItemById?: number;
}

export function RequestsOverviewTable({
  items,
  meta,
  isLoading,
  onItemClick,
  disabledItemById,
}: IRequestsOverviewTableProps) {
  const [activityStatus, setActivityStatus] = useState<ActivityStatus>();
  const [buttonsLoading, setButtonsLoading] = useState({
    isCancelButtonLoading: false,
    isApproveButtonLoading: false,
    isDeclineButtonLoading: false,
  });
  const requestIncludesActivityAction = (
    item: IActivity,
    action: RequestAction
  ) => {
    return item._embedded.actions?.some((a) => a === action);
  };
  return (
    <PaginatedTable
      items={items}
      meta={meta}
      isLoading={isLoading}
      headers={[
        {
          children: t("workspaceRequests.employeeName"),
          sort: true,
          param: "name",
        },
        {
          children: t("workspaceRequests.requestType"),
          filter: {
            options: [
              {
                label: t("userHub.businessTrip"),
                value: ActivityType.BusinessTrip,
              },
              {
                label: t("userHub.tripToOffice"),
                value: ActivityType.TripToOffice,
              },
              { label: t("userHub.expense"), value: ActivityType.Expense },
              { label: t("userHub.overtime"), value: ActivityType.Overtime },
              { label: t("userHub.onCall"), value: ActivityType.OnCall },
              {
                label: t("userHub.schoolSchedule"),
                value: ActivityType.SchoolSchedule,
              },
              { label: t("userHub.sickLeave"), value: ActivityType.SickLeave },
              { label: t("userHub.vacation"), value: ActivityType.Vacation },
              {
                label: t("userHub.specialLeave"),
                value: ActivityType.SpecialLeave,
              },
            ],
            multiple: true,
            param: "types",
          },
          param: "types",
        },
        {
          children: t("workspaceRequests.requestedAt"),
          sort: true,
          param: "createdAt",
        },
        {
          children: t("workspaceRequests.date"),
          sort: true,
          param: "dateStart",
        },
        {
          children: t("workspaceRequests.details"),
        },
        {
          children: t("workspaceRequests.projects"),
        },
        {
          children: t("workspaceRequests.status"),
        },
      ]}
      render={(item) => {
        const user = item._embedded.workspaceUser;
        const workPosition = user?._embedded?.workPosition?.name;
        const isDisabledItem = disabledItemById === item.id; // Check if this item is currently loading
        return (
          <TableRow
            key={item.id}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              onItemClick && onItemClick(item);
            }}
          >
            <TableCell>
              <Flex alignItems="center" gap="10px">
                <Avatar
                  avatarId={user.id}
                  name={`${user?.name} ${user?.surname}`}
                  size="40px"
                  fontSize="16px"
                />
                <FlexColumn>
                  <Typography>
                    {user ? fullNameFormatter(user) : t("error.notPresent")}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#8C8C8C",
                    }}
                  >
                    {workPosition ?? t("error.notPresent")}
                  </Typography>
                </FlexColumn>
              </Flex>
            </TableCell>
            <TableCell>
              <Chip
                label={getActivityTypeLabel(item.activityType)}
                color="primary"
                variant="light"
              />
            </TableCell>
            <TableCell>
              {item.createdAt
                ? formatDateWithStartAndEnd(
                    { date: item.createdAt },
                    "DD. MMM, YYYY"
                  )
                : "/"}
            </TableCell>
            <TableCell>
              {formatDateWithStartAndEnd(item, "DD. MMM, YYYY")}
            </TableCell>
            <TableCell sx={{ maxWidth: "200px" }}>
              <Typography noWrap>
                {item.description ?? t("error.notPresent")}
              </Typography>
            </TableCell>
            <TableCell>{item.projectName ?? t("error.notPresent")}</TableCell>
            <TableCell>
              {item.status === ActivityStatus.Approved ? (
                <Chip
                  label={getActivityStatusLabel(item.status)}
                  color="success"
                  variant="light"
                />
              ) : item.status === ActivityStatus.Rejected ? (
                <Chip
                  label={getActivityStatusLabel(item.status)}
                  color="error"
                  variant="light"
                />
              ) : (
                <Form method="post">
                  <Flex gap="10px">
                    <input
                      type="hidden"
                      name="action"
                      value={activityStatus ?? ""}
                    />
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="employeeId" value={user.id} />
                    {requestIncludesActivityAction(
                      item,
                      RequestAction.Approve
                    ) && (
                      <MiniButton
                        color="primary"
                        variant="contained"
                        type="submit"
                        value="updateStatus"
                        name="intent"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivityStatus(ActivityStatus.Approved);
                          setButtonsLoading({
                            isDeclineButtonLoading: false,
                            isCancelButtonLoading: false,
                            isApproveButtonLoading: true,
                          });
                        }}
                        loading={
                          isDisabledItem &&
                          buttonsLoading.isApproveButtonLoading
                        }
                      >
                        {t("workspaceRequests.approve")}
                      </MiniButton>
                    )}
                    {requestIncludesActivityAction(
                      item,
                      RequestAction.Reject
                    ) && (
                      <MiniButton
                        color="inherit"
                        variant="outlined"
                        type="submit"
                        value="updateStatus"
                        name="intent"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivityStatus(ActivityStatus.Rejected);
                          setButtonsLoading({
                            isDeclineButtonLoading: true,
                            isCancelButtonLoading: false,
                            isApproveButtonLoading: false,
                          });
                        }}
                        loading={
                          isDisabledItem &&
                          buttonsLoading.isDeclineButtonLoading
                        }
                      >
                        {t("workspaceRequests.decline")}
                      </MiniButton>
                    )}
                    {requestIncludesActivityAction(
                      item,
                      RequestAction.Cancel
                    ) && (
                      <MiniButton
                        color="error"
                        variant="contained"
                        type="submit"
                        value="delete"
                        name="intent"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivityStatus(ActivityStatus.Canceled);
                          setButtonsLoading({
                            isDeclineButtonLoading: false,
                            isCancelButtonLoading: true,
                            isApproveButtonLoading: false,
                          });
                        }}
                        loading={
                          isDisabledItem && buttonsLoading.isCancelButtonLoading
                        }
                      >
                        {t("workspaceRequests.cancel")}
                      </MiniButton>
                    )}
                  </Flex>
                </Form>
              )}
            </TableCell>
          </TableRow>
        );
      }}
    />
  );
}
