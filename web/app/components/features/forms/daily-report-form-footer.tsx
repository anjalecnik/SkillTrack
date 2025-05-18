import { Divider } from "@mui/material";
import {
  Form,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import {
  ActivityAction,
  ActivityWorkLocation,
  DailyActivityIntent,
  IActivityByIdResponse,
  IActivityHours,
  NavigationState,
  SearchParam,
} from "~/types";
import { t } from "i18next";
import { Flex, Button } from "~/components/common";
import { useIsAdminRoute, useNavigationState } from "~/hooks";
import { ADMIN_HUB_BASE_PATH, USER_HUB_BASE_PATH } from "~/constants";
import { FormId, useFormMetadata } from "@conform-to/react";
import { DailyActivitySubmissionType } from "~/schemas";
import { ActivityClient } from "~/clients";
import { displaySuccess, handleAxiosError } from "~/util";
import { DataTestIds } from "~/data-test-ids";

interface DailyReportFormFooterProps {
  selectedProjects?: IActivityHours[];
  formId: FormId<DailyActivitySubmissionType, string[]>;
  searchParams: URLSearchParams;
  date: Dayjs;
  latestActivity: IActivityByIdResponse | null;
}

interface LoadingBtn {
  home: boolean;
  office: boolean;
}

export function DailyReportFormFooter({
  formId,
  searchParams,
  date,
  latestActivity,
}: DailyReportFormFooterProps) {
  const { navigationState } = useNavigationState();
  const navigate = useNavigate();
  const location = useLocation();
  const [isBtnLoading, setIsBtnLoading] = useState<LoadingBtn>({
    home: false,
    office: false,
  });
  const isLoading = navigationState === NavigationState.Submitting;
  const userIdFromUrl =
    searchParams.get("userId") || searchParams.get("employeeId");
  const isAdmin = useIsAdminRoute();
  const isOnWorkspaceHub = location.pathname.startsWith(
    `/${ADMIN_HUB_BASE_PATH}`
  );
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (navigationState === NavigationState.Idle) {
      setIsBtnLoading({ home: false, office: false });
    }
  }, [navigationState]);

  // If unassigned and we already have activities it means its update time
  const action =
    latestActivity &&
    date.isSame(dayjs(latestActivity?.date), "day") &&
    searchParams.get("action") === ActivityAction.Create
      ? ActivityAction.Update
      : searchParams.get("action");

  const handleGoBack = () => {
    if (userIdFromUrl) {
      let baseUrl = `/${ADMIN_HUB_BASE_PATH}/activity-dashboard`;
      if (!isOnWorkspaceHub) {
        baseUrl = `/${USER_HUB_BASE_PATH}/employees/${userIdFromUrl}`;
        searchParams.set(SearchParam.View, "activity");
        setSearchParams(searchParams);
      }
      return navigate(baseUrl);
    }
    if (location && location.pathname.includes(ADMIN_HUB_BASE_PATH)) {
      navigate(-1);
    } else {
      navigate("..", { relative: "path" });
    }
  };

  const handleDeleteButton = async () => {
    if (!latestActivity || !userIdFromUrl) {
      return;
    }

    try {
      setIsBtnLoading({ home: false, office: false });
      await ActivityClient.deleteActivity(
        {
          employeeId: Number(userIdFromUrl),
        },
        latestActivity.id
      );
      displaySuccess(
        t("dailyReport.activityDeleted", {
          date: dayjs(latestActivity.date).format("DD.MM.YYYY"),
        })
      );
      navigate(-1);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  const form = useFormMetadata(formId);
  const fields = form.getFieldset();
  const workingTimes = fields.workingTime.getFieldList();

  const isButtonDisabled = workingTimes
    .map((wt) => wt.getFieldset().projectId.value)
    .every((v) => v === undefined);

  return (
    <Form method="post" id={formId}>
      <input
        type="hidden"
        name="intent"
        value={DailyActivityIntent.DailyActivities}
      />
      <input type="hidden" name="date" value={date.format("YYYY-MM-DD")} />
      <input type="hidden" name="action" value={action as string} />
      {latestActivity && (
        <input type="hidden" name="activityId" value={latestActivity.id} />
      )}
      <Divider />

      <Flex
        justifyContent={
          action === "update" && isAdmin ? "space-between" : "end"
        }
        padding="10px 16px"
      >
        {action === "update" && isAdmin && (
          <Button
            variant="contained"
            color="error"
            type="button"
            onClick={handleDeleteButton}
          >
            {t("common.delete")}
          </Button>
        )}

        <Flex gap="20px">
          <Button variant="outlined" onClick={handleGoBack}>
            {t("common.cancel")}
          </Button>
          <Button
            data-testid={DataTestIds.dailyReport.inOfficeBtn}
            variant="contained"
            color="primary"
            name="location"
            type="submit"
            value={ActivityWorkLocation.Office}
            loading={isLoading && isBtnLoading.office}
            disabled={isLoading || isButtonDisabled}
            onClick={() => setIsBtnLoading({ home: false, office: true })}
          >
            {t("dailyReport.inOffice")}
          </Button>
          <Button
            data-testid={DataTestIds.dailyReport.fromHomeBtn}
            variant="contained"
            color="primary"
            name="location"
            type="submit"
            value={ActivityWorkLocation.Home}
            loading={isLoading && isBtnLoading.home}
            disabled={isLoading || isButtonDisabled}
            onClick={() => setIsBtnLoading({ home: true, office: false })}
          >
            {t("dailyReport.fromHome")}
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
}
