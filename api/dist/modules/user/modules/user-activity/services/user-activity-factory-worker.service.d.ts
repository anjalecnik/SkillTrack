import { IUserActivityRequestEnriched } from "../interfaces/user-activity-request-enriched.interface";
import { ActivityBusinessTripService } from "../modules/activity-business-trip/services/activity-business-trip.service";
import { ActivityDailyService } from "../modules/activity-daily/services/activity-daily.service";
import { IActivitySharedRequestCancelRequest, IActivitySharedRequestCreateFactory, IActivitySharedRequestReviewRequest, IActivitySharedRequestUpdateFactory, IInvokerMetadata } from "../modules/activity-shared/interfaces";
import { ActivitySickLeaveService } from "../modules/activity-sick-leave/services/activity-sick-leave.service";
import { ActivityVacationService } from "../modules/activity-vacation/services/activity-vacation.service";
import { ActivityPerformanceReviewService } from "../modules/activity-performance-review/services/activity-performance-review.service";
import { UserActivityType } from "src/utils/types/enums/user-activity.enum";
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
export declare class UserActivityFactoryWorkerService {
    private readonly activityBusinessTripService;
    private readonly activityDailyService;
    private readonly activitySickLeaveService;
    private readonly activityVacationService;
    private readonly activityPerformanceReviewService;
    constructor(activityBusinessTripService: ActivityBusinessTripService, activityDailyService: ActivityDailyService, activitySickLeaveService: ActivitySickLeaveService, activityVacationService: ActivityVacationService, activityPerformanceReviewService: ActivityPerformanceReviewService);
    createActivityRequest(userInvoker: IInvokerMetadata, { dateStart, dateEnd, ...activity }: IActivitySharedRequestCreateFactory): Promise<IUserActivityRequestEnriched>;
    updateActivityRequest(userInvoker: IInvokerMetadata, activityRequestUpdate: IActivitySharedRequestUpdateFactory): Promise<IUserActivityRequestEnriched>;
    cancelActivityRequest(userInvoker: IInvokerMetadata, activityRequestCancel: IActivitySharedRequestCancelRequest, activityType: UserActivityType): Promise<IUserActivityRequestEnriched>;
    reviewActivityRequest(userInvoker: IAuthJwtPassportUserRequest, activityRequestReview: IActivitySharedRequestReviewRequest, activityType: UserActivityType): Promise<IUserActivityRequestEnriched>;
    enrichActivityRequest(userInvoker: IAuthJwtPassportUserRequest, activityRequest: UserActivityRequestEntity, subordinateIds?: number[]): Promise<IUserActivityRequestEnriched>;
}
