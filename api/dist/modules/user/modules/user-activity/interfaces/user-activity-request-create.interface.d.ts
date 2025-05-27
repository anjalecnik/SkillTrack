import { ActivityRequestBusinessTripCreateRequest } from "../modules/activity-business-trip/dtos/request/activity-request-business-trip-create.request";
import { ActivityRequestDailyCreateRequest } from "../modules/activity-daily/dtos/request/activity-request-daily-create.request";
import { ActivityRequestPerformanceReviewCreateRequest } from "../modules/activity-performance-review/dtos/request/activity-request-performance-review-create.request";
import { ActivityRequestSickLeaveCreateRequest } from "../modules/activity-sick-leave/dtos/request/activity-request-sick-leave-create.request";
import { ActivityRequestVacationCreateRequest } from "../modules/activity-vacation/dtos/request/activity-request-vacation-create.request";
export type IUserActivityRequestCreate = ActivityRequestBusinessTripCreateRequest | ActivityRequestDailyCreateRequest | ActivityRequestSickLeaveCreateRequest | ActivityRequestVacationCreateRequest | ActivityRequestPerformanceReviewCreateRequest;
