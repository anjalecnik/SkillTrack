import { CardLayout } from "~/components/layout";
import { PaginatedResponse } from "~/types";
import { useNavigationState } from "~/hooks";
import { PerformanceReviewCardHeader } from "./PerformanceReviewCardHeader";
import { PerformanceReviewTable } from "../tables/performance-review-table";
import { Dispatch, SetStateAction } from "react";
import {
  IPerformanceReview,
  IUsersPerformanceReviews,
} from "~/types/interfaces/performance-review/users-performance-reviews-table";
import { PerformanceReviewQuartal } from "~/types/enums/performance-review-quartal.enum";
import { IActivityPerformanceReviewForm } from "~/types/interfaces/activity/activity-performance-review-form";
import { useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";

interface IPerformanceReviewCardProps {
  performanceReviews?: PaginatedResponse<IUsersPerformanceReviews>;
  setPerformanceReviewPopupOpen: Dispatch<SetStateAction<boolean>>;
  setIsViewing: Dispatch<SetStateAction<boolean>>;
  setDefaultPerformanceReviewValues: (
    defaultValues: IActivityPerformanceReviewForm
  ) => void;
}

export function PerformanceReviewCard({
  performanceReviews,
  setPerformanceReviewPopupOpen,
  setIsViewing,
  setDefaultPerformanceReviewValues,
}: IPerformanceReviewCardProps) {
  const [searchParams] = useSearchParams();
  const { isLoading } = useNavigationState();

  const handlePerformanceReviewClick = (
    isViewing: boolean = false,
    userId?: number,
    quartal?: PerformanceReviewQuartal,
    review?: IPerformanceReview
  ) => {
    setDefaultPerformanceReviewValues({
      employeeId: userId,
      quartal,
      year: (() => {
        if (review?.year) {
          return review.year;
        } else if (searchParams.get("year")) {
          return Number(searchParams.get("year"));
        } else {
          return dayjs().year();
        }
      })(),
      answer1: review?.answer1,
      answer2: review?.answer2,
      answer3: review?.answer3,
      answer4: review?.answer4,
      activityId: review?.activityId,
    });
    if (isViewing) setIsViewing(true);
    setPerformanceReviewPopupOpen(true);
  };

  return (
    <CardLayout>
      <PerformanceReviewCardHeader
        onClick={() => {
          setPerformanceReviewPopupOpen(true);
          handlePerformanceReviewClick();
        }}
      />
      <PerformanceReviewTable
        items={performanceReviews?.data ?? []}
        meta={{
          total: performanceReviews?.meta?.total,
          page: performanceReviews?.meta?.page,
          limit: 10,
        }}
        isLoading={isLoading}
        onPerformanceReviewClick={handlePerformanceReviewClick}
      />
    </CardLayout>
  );
}
