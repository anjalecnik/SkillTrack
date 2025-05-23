import { BadRequestException, Injectable, PipeTransform, ValidationPipe } from "@nestjs/common"
import { IUserActivityRequestUpdate } from "src/modules/user/modules/user-activity/interfaces"
import { ActivityRequestBusinessTripUpdateRequest } from "src/modules/user/modules/user-activity/modules/activity-business-trip/dtos/request/activity-request-business-trip-update.request"
import { ActivityRequestDailyUpdateRequest } from "src/modules/user/modules/user-activity/modules/activity-daily/dtos/request/activity-request-daily-update.request"
import { ActivityRequestPerformanceReviewUpdateRequest } from "src/modules/user/modules/user-activity/modules/activity-performance-review/dtos/request/activity-request-performance-review-update.request"
import { UserActivityType } from "../types/enums/user-activity.enum"

interface IActivityEssentials {
	activityType: UserActivityType
}

@Injectable()
export class UpdateUserActivityValidationPipe implements PipeTransform {
	private readonly validationPipe = new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })

	async transform<T extends IActivityEssentials>(object: T) {
		const activity = await this.getActivity(object)
		return activity
	}

	private async getActivity<T extends IActivityEssentials>(object: T): Promise<IUserActivityRequestUpdate> {
		switch (object.activityType) {
			case UserActivityType.BusinessTrip:
				return (await this.validationPipe.transform(object, { type: "body", metatype: ActivityRequestBusinessTripUpdateRequest })) as ActivityRequestBusinessTripUpdateRequest
			case UserActivityType.Daily:
				return (await this.validationPipe.transform(object, { type: "body", metatype: ActivityRequestDailyUpdateRequest })) as ActivityRequestDailyUpdateRequest
			case UserActivityType.PerformanceReview:
				return (await this.validationPipe.transform(object, {
					type: "body",
					metatype: ActivityRequestPerformanceReviewUpdateRequest
				})) as ActivityRequestPerformanceReviewUpdateRequest
			default:
				throw new BadRequestException(`Invalid activityType`)
		}
	}
}
