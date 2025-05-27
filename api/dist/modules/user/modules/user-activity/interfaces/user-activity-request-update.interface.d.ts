import { ActivityRequestBusinessTripUpdateRequest } from "../modules/activity-business-trip/dtos/request/activity-request-business-trip-update.request";
import { ActivityRequestDailyUpdateRequest } from "../modules/activity-daily/dtos/request/activity-request-daily-update.request";
import { ActivityRequestPerformanceReviewUpdateRequest } from "../modules/activity-performance-review/dtos/request/activity-request-performance-review-update.request";
export type IUserActivityRequestUpdate = ActivityRequestBusinessTripUpdateRequest | ActivityRequestDailyUpdateRequest | ActivityRequestPerformanceReviewUpdateRequest;
