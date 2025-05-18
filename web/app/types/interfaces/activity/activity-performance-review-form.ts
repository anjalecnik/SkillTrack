import { PerformanceReviewQuartal } from "~/types/enums/performance-review-quartal.enum";

export interface IActivityPerformanceReviewForm {
  employeeId?: number;
  quartal?: PerformanceReviewQuartal;
  year?: number;
  answer1?: number;
  answer2?: number;
  answer3?: boolean;
  answer4?: boolean;
  activityId?: number;
}
