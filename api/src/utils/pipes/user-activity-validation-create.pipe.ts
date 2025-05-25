import { BadRequestException, Injectable, PipeTransform, ValidationPipe } from "@nestjs/common"
import { IUserActivityRequestCreate } from "src/modules/user/modules/user-activity/interfaces"
import { ActivityRequestBusinessTripCreateRequest } from "src/modules/user/modules/user-activity/modules/activity-business-trip/dtos/request/activity-request-business-trip-create.request"
import { ActivityRequestDailyCreateRequest } from "src/modules/user/modules/user-activity/modules/activity-daily/dtos/request/activity-request-daily-create.request"
import { ActivityRequestPerformanceReviewCreateRequest } from "src/modules/user/modules/user-activity/modules/activity-performance-review/dtos/request/activity-request-performance-review-create.request"
import { ActivityRequestSickLeaveCreateRequest } from "src/modules/user/modules/user-activity/modules/activity-sick-leave/dtos/request/activity-request-sick-leave-create.request"
import { ActivityRequestVacationCreateRequest } from "src/modules/user/modules/user-activity/modules/activity-vacation/dtos/request/activity-request-vacation-create.request"
import { UserActivityType } from "../types/enums/user-activity.enum"

interface IActivityEssentials {
	activityType: UserActivityType
}

@Injectable()
export class CreateUserActivityValidationPipe implements PipeTransform {
	constructor(private readonly validationPipe: ValidationPipe) {}

	async transform<T extends IActivityEssentials>(object: T) {
		const activity = await this.getActivity(object)
		return activity
	}

	private async getActivity<T extends IActivityEssentials>(object: T): Promise<IUserActivityRequestCreate> {
		switch (object.activityType) {
			case UserActivityType.BusinessTrip:
				return (await this.validationPipe.transform(object, { type: "body", metatype: ActivityRequestBusinessTripCreateRequest })) as ActivityRequestBusinessTripCreateRequest
			case UserActivityType.Daily:
				return (await this.validationPipe.transform(object, { type: "body", metatype: ActivityRequestDailyCreateRequest })) as ActivityRequestDailyCreateRequest
			case UserActivityType.SickLeave:
				return (await this.validationPipe.transform(object, { type: "body", metatype: ActivityRequestSickLeaveCreateRequest })) as ActivityRequestSickLeaveCreateRequest
			case UserActivityType.Vacation:
				return (await this.validationPipe.transform(object, { type: "body", metatype: ActivityRequestVacationCreateRequest })) as ActivityRequestVacationCreateRequest
			case UserActivityType.PerformanceReview:
				return (await this.validationPipe.transform(object, {
					type: "body",
					metatype: ActivityRequestPerformanceReviewCreateRequest
				})) as ActivityRequestPerformanceReviewCreateRequest
			default: {
				throw new BadRequestException(`Invalid activityType`)
			}
		}
	}
}
