import { ApiProperty, getSchemaPath } from "@nestjs/swagger"
import { ActivityRequestBusinessTripListItemHalResponse } from "../../modules/activity-business-trip/dtos/response/activity-request-business-trip-list-item-hal.response"
import { ActivityRequestDailyListItemHalResponse } from "../../modules/activity-daily/dtos/response/activity-request-daily-list-item-hal.response"
import { ActivityRequestSickLeaveListItemHalResponse } from "../../modules/activity-sick-leave/dtos/response/activity-request-sick-leave-list-item-hal.response"
import { ActivityRequestVacationListItemHalResponse } from "../../modules/activity-vacation/dtos/response/activity-request-vacation-list-item-hal.response"
import { ActivityRequestPerformanceReviewListItemHalResponse } from "../../modules/activity-performance-review/dtos/response/activity-request-performance-review-list-item-hal.response"
import { HalResourceResponse } from "src/utils/types/dtos"

export class UserActivityRequestListHalResponse extends HalResourceResponse {
	@ApiProperty({
		type: "array",
		items: {
			oneOf: [
				{ $ref: getSchemaPath(ActivityRequestBusinessTripListItemHalResponse) },
				{ $ref: getSchemaPath(ActivityRequestDailyListItemHalResponse) },
				{ $ref: getSchemaPath(ActivityRequestSickLeaveListItemHalResponse) },
				{ $ref: getSchemaPath(ActivityRequestVacationListItemHalResponse) },
				{ $ref: getSchemaPath(ActivityRequestPerformanceReviewListItemHalResponse) }
			]
		}
	})
	requests!: (
		| ActivityRequestBusinessTripListItemHalResponse
		| ActivityRequestDailyListItemHalResponse
		| ActivityRequestSickLeaveListItemHalResponse
		| ActivityRequestVacationListItemHalResponse
		| ActivityRequestPerformanceReviewListItemHalResponse
	)[]
}
