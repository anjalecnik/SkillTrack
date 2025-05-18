import { PerformanceReviewQuartal } from "~/types/enums/performance-review-quartal.enum";

export interface IPerformanceReviewActivityReq {
  quartal: PerformanceReviewQuartal;
  answer1: number;
  answer2: number;
  answer3: boolean;
  answer4: boolean;
  activityType: string;
  date?: string;
  year: number;
}
