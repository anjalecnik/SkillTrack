import { json } from "@remix-run/node";
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { PerformanceReviewCard } from "~/components/features/cards/PerformanceReviewCard";
import { AddPerformanceReviewDialogForm } from "~/components/features/forms/add-performance-review-form";
import { AppLayout, AppHeaderBreadcrumbs } from "~/components/layout";
import {
  BreadcrumbVariant,
  Status,
  UserStatusWithoutInvited,
} from "~/types";
import {
  displaySuccess,
  formatDate,
  handleAxiosError,
  requireAdminRoleOrHigher,
} from "~/util";
import { parseWithZod } from "@conform-to/zod";
import { performanceReviewFormDialogSchema as schema } from "~/schemas/activities/performance-review-form-schema";
import { IPerformanceReviewActivityReq } from "~/types/interfaces/activity/requests/performance-review-activity.request";
import { ActivityClient, UserClient } from "~/clients";
import dayjs from "dayjs";
import { DEFAULT_PAGINATION_LIMIT } from "~/constants";
import { IActivityPerformanceReviewForm } from "~/types/interfaces/activity/activity-performance-review-form";

export const clientAction = async (actionArgs: ClientActionFunctionArgs) => {
  const formData = await actionArgs.request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== Status.Success) {
    return json(submission.reply());
  }

  try {
    if (submission.value.activityId) {
      const updatePerformanceReviewReq: IPerformanceReviewActivityReq = {
        quartal: submission.value.quartal,
        year: submission.value.year,
        answer1: submission.value.answer1,
        answer2: submission.value.answer2,
        answer3: submission.value.answer3,
        answer4: submission.value.answer4,
        activityType: "PerformanceReview",
      };

      await ActivityClient.updateActivity(
        {
          employeeId: submission.value.employeeId,
         
        },
        submission.value.activityId,
        updatePerformanceReviewReq
      );

      displaySuccess(
        t("workspacePerformanceReviews.updatedPerformanceReview")!
      );
    } else {
      const createPerformanceReviewReq: IPerformanceReviewActivityReq = {
        quartal: submission.value.quartal,
        year: submission.value.year,
        answer1: submission.value.answer1,
        answer2: submission.value.answer2,
        answer3: submission.value.answer3,
        answer4: submission.value.answer4,
        date: formatDate(dayjs(), undefined, "YYYY-MM-DD"),
        activityType: "PerformanceReview",
      };

      await ActivityClient.createActivity(
        {
          employeeId: submission.value.employeeId,
        
        },
        createPerformanceReviewReq
      );
      displaySuccess(
        t("workspacePerformanceReviews.addedNewPerformanceReview")!
      );
    }

    return json(submission.reply());
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const clientLoader = async (loaderArgs: ClientLoaderFunctionArgs) => {
  requireAdminRoleOrHigher(loaderArgs);

  const modifiedLoaderArgs = { ...loaderArgs };
  const requestUrl = new URL(modifiedLoaderArgs.request.url);
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set(
    "status",
    Object.values(UserStatusWithoutInvited).join(",")
  );
  requestUrl.search = urlSearchParams.toString();
  modifiedLoaderArgs.request = new Request(requestUrl, loaderArgs.request);

  try {
    const [performanceReviews, users] = await Promise.all([
      ActivityClient.getUsersPerformanceReviewsActivity(
        loaderArgs,
        DEFAULT_PAGINATION_LIMIT
      ),
      UserClient.getUsers(modifiedLoaderArgs),
    ]);

    return json({ performanceReviews, users });
  } catch (error) {
    return handleAxiosError(error);
  }
};

export default function WorkspacehubPerformanceReviews() {
  const { performanceReviews, users } =
    useLoaderData<typeof clientLoader>() || {};
  const lastResult = useActionData<typeof clientAction>();

  const [performanceReviewPopupOpen, setPerformanceReviewPopupOpen] =
    useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedPerformanceReview, setSelectedPerformanceReview] =
    useState<IActivityPerformanceReviewForm>();

  const resetPerformanceReviewState = (shouldClose?: boolean) => {
    shouldClose
      ? setSelectedPerformanceReview(undefined)
      : setSelectedPerformanceReview((prevReview) => ({
          quartal: prevReview?.quartal,
          year: prevReview?.year,
        }));
    setIsEditing(false);
    setIsViewing(false);

    if (shouldClose) {
      setPerformanceReviewPopupOpen(false);
    }
  };

  useEffect(() => {
    if (lastResult && lastResult.status === Status.Success) {
      resetPerformanceReviewState();

      setPerformanceReviewPopupOpen(
        lastResult?.initialValue?.intent === "createAndAddMoreDetails"
      );
    }
  }, [lastResult]);

  return (
    <AppLayout>
      <AppHeaderBreadcrumbs
        list={[
          {
            text: t("workspacePerformanceReviews.performanceReviews"),
            variant: BreadcrumbVariant.Current,
          },
        ]}
      />
      <PerformanceReviewCard
        performanceReviews={performanceReviews}
        setPerformanceReviewPopupOpen={setPerformanceReviewPopupOpen}
        setDefaultPerformanceReviewValues={setSelectedPerformanceReview}
        setIsViewing={setIsViewing}
      />
      <AddPerformanceReviewDialogForm
        lastResult={lastResult}
        employees={users?.data ?? []}
        defaultValues={selectedPerformanceReview}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isViewing={isViewing}
        setIsViewing={setIsViewing}
        isOpen={performanceReviewPopupOpen}
        onClose={resetPerformanceReviewState}
      />
    </AppLayout>
  );
}
