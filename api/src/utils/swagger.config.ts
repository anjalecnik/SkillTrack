import { INestApplication } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ActivityRequestBusinessTripCreateRequest } from "src/modules/user/modules/user-activity/modules/activity-business-trip/dtos/request/activity-request-business-trip-create.request"
import { ActivityBusinessTripListItemHalResponse } from "src/modules/user/modules/user-activity/modules/activity-business-trip/dtos/response/activity-business-trip-list-item-hal.response"
import { ActivityRequestBusinessTripListItemHalResponse } from "src/modules/user/modules/user-activity/modules/activity-business-trip/dtos/response/activity-request-business-trip-list-item-hal.response"
import { ActivityRequestDailyCreateRequest } from "src/modules/user/modules/user-activity/modules/activity-daily/dtos/request/activity-request-daily-create.request"
import { ActivityDailyListItemHalResponse } from "src/modules/user/modules/user-activity/modules/activity-daily/dtos/response/activity-daily-list-item-hal.response"
import { ActivityRequestDailyListItemHalResponse } from "src/modules/user/modules/user-activity/modules/activity-daily/dtos/response/activity-request-daily-list-item-hal.response"
import { ActivityRequestPerformanceReviewListItemHalResponse } from "src/modules/user/modules/user-activity/modules/activity-performance-review/dtos/response/activity-request-performance-review-list-item-hal.response"
import { ActivityRequestSickLeaveCreateRequest } from "src/modules/user/modules/user-activity/modules/activity-sick-leave/dtos/request/activity-request-sick-leave-create.request"
import { ActivityRequestSickLeaveListItemHalResponse } from "src/modules/user/modules/user-activity/modules/activity-sick-leave/dtos/response/activity-request-sick-leave-list-item-hal.response"
import { ActivitySickLeaveListItemHalResponse } from "src/modules/user/modules/user-activity/modules/activity-sick-leave/dtos/response/activity-sick-leave-list-item-hal.response"
import { ActivityRequestVacationCreateRequest } from "src/modules/user/modules/user-activity/modules/activity-vacation/dtos/request/activity-request-vacation-create.request"
import { ActivityRequestVacationListItemHalResponse } from "src/modules/user/modules/user-activity/modules/activity-vacation/dtos/response/activity-request-vacation-list-item-hal.response"
import { ActivityVacationListItemHalResponse } from "src/modules/user/modules/user-activity/modules/activity-vacation/dtos/response/activity-vacation-list-item-hal.response"
import { Config } from "./config/config"

export class SwaggerConfig {
	static setupSwagger(app: INestApplication): void {
		const options = new DocumentBuilder().setTitle("SkillTrack API").setDescription("API to manage SkillTrack").addBearerAuth().build()
		const document = SwaggerModule.createDocument(app, options, {
			extraModels: [
				ActivityBusinessTripListItemHalResponse,
				ActivityDailyListItemHalResponse,
				ActivitySickLeaveListItemHalResponse,
				ActivityVacationListItemHalResponse,

				ActivityRequestBusinessTripCreateRequest,
				ActivityRequestDailyCreateRequest,
				ActivityRequestSickLeaveCreateRequest,
				ActivityRequestVacationCreateRequest,

				ActivityRequestBusinessTripListItemHalResponse,
				ActivityRequestDailyListItemHalResponse,
				ActivityRequestSickLeaveListItemHalResponse,
				ActivityRequestVacationListItemHalResponse,
				ActivityRequestPerformanceReviewListItemHalResponse
			]
		})
		SwaggerModule.setup(Config.get<string>("GLOBAL_PREFIX"), app, document)
	}
}
