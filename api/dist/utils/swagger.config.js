"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
const activity_request_business_trip_create_request_1 = require("../modules/user/modules/user-activity/modules/activity-business-trip/dtos/request/activity-request-business-trip-create.request");
const activity_business_trip_list_item_hal_response_1 = require("../modules/user/modules/user-activity/modules/activity-business-trip/dtos/response/activity-business-trip-list-item-hal.response");
const activity_request_business_trip_list_item_hal_response_1 = require("../modules/user/modules/user-activity/modules/activity-business-trip/dtos/response/activity-request-business-trip-list-item-hal.response");
const activity_request_daily_create_request_1 = require("../modules/user/modules/user-activity/modules/activity-daily/dtos/request/activity-request-daily-create.request");
const activity_daily_list_item_hal_response_1 = require("../modules/user/modules/user-activity/modules/activity-daily/dtos/response/activity-daily-list-item-hal.response");
const activity_request_daily_list_item_hal_response_1 = require("../modules/user/modules/user-activity/modules/activity-daily/dtos/response/activity-request-daily-list-item-hal.response");
const activity_request_performance_review_list_item_hal_response_1 = require("../modules/user/modules/user-activity/modules/activity-performance-review/dtos/response/activity-request-performance-review-list-item-hal.response");
const activity_request_sick_leave_create_request_1 = require("../modules/user/modules/user-activity/modules/activity-sick-leave/dtos/request/activity-request-sick-leave-create.request");
const activity_request_sick_leave_list_item_hal_response_1 = require("../modules/user/modules/user-activity/modules/activity-sick-leave/dtos/response/activity-request-sick-leave-list-item-hal.response");
const activity_sick_leave_list_item_hal_response_1 = require("../modules/user/modules/user-activity/modules/activity-sick-leave/dtos/response/activity-sick-leave-list-item-hal.response");
const activity_request_vacation_create_request_1 = require("../modules/user/modules/user-activity/modules/activity-vacation/dtos/request/activity-request-vacation-create.request");
const activity_request_vacation_list_item_hal_response_1 = require("../modules/user/modules/user-activity/modules/activity-vacation/dtos/response/activity-request-vacation-list-item-hal.response");
const activity_vacation_list_item_hal_response_1 = require("../modules/user/modules/user-activity/modules/activity-vacation/dtos/response/activity-vacation-list-item-hal.response");
const config_1 = require("./config/config");
class SwaggerConfig {
    static setupSwagger(app) {
        const options = new swagger_1.DocumentBuilder().setTitle("SkillTrack API").setDescription("API to manage SkillTrack").addBearerAuth().build();
        const document = swagger_1.SwaggerModule.createDocument(app, options, {
            extraModels: [
                activity_business_trip_list_item_hal_response_1.ActivityBusinessTripListItemHalResponse,
                activity_daily_list_item_hal_response_1.ActivityDailyListItemHalResponse,
                activity_sick_leave_list_item_hal_response_1.ActivitySickLeaveListItemHalResponse,
                activity_vacation_list_item_hal_response_1.ActivityVacationListItemHalResponse,
                activity_request_business_trip_create_request_1.ActivityRequestBusinessTripCreateRequest,
                activity_request_daily_create_request_1.ActivityRequestDailyCreateRequest,
                activity_request_sick_leave_create_request_1.ActivityRequestSickLeaveCreateRequest,
                activity_request_vacation_create_request_1.ActivityRequestVacationCreateRequest,
                activity_request_business_trip_list_item_hal_response_1.ActivityRequestBusinessTripListItemHalResponse,
                activity_request_daily_list_item_hal_response_1.ActivityRequestDailyListItemHalResponse,
                activity_request_sick_leave_list_item_hal_response_1.ActivityRequestSickLeaveListItemHalResponse,
                activity_request_vacation_list_item_hal_response_1.ActivityRequestVacationListItemHalResponse,
                activity_request_performance_review_list_item_hal_response_1.ActivityRequestPerformanceReviewListItemHalResponse
            ]
        });
        swagger_1.SwaggerModule.setup(config_1.Config.get("GLOBAL_PREFIX"), app, document);
    }
}
exports.SwaggerConfig = SwaggerConfig;
//# sourceMappingURL=swagger.config.js.map