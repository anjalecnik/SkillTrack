"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityRequestListHalResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const activity_request_business_trip_list_item_hal_response_1 = require("../../modules/activity-business-trip/dtos/response/activity-request-business-trip-list-item-hal.response");
const activity_request_daily_list_item_hal_response_1 = require("../../modules/activity-daily/dtos/response/activity-request-daily-list-item-hal.response");
const activity_request_sick_leave_list_item_hal_response_1 = require("../../modules/activity-sick-leave/dtos/response/activity-request-sick-leave-list-item-hal.response");
const activity_request_vacation_list_item_hal_response_1 = require("../../modules/activity-vacation/dtos/response/activity-request-vacation-list-item-hal.response");
const activity_request_performance_review_list_item_hal_response_1 = require("../../modules/activity-performance-review/dtos/response/activity-request-performance-review-list-item-hal.response");
const dtos_1 = require("../../../../../../utils/types/dtos");
class UserActivityRequestListHalResponse extends dtos_1.HalResourceResponse {
    requests;
}
exports.UserActivityRequestListHalResponse = UserActivityRequestListHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "array",
        items: {
            oneOf: [
                { $ref: (0, swagger_1.getSchemaPath)(activity_request_business_trip_list_item_hal_response_1.ActivityRequestBusinessTripListItemHalResponse) },
                { $ref: (0, swagger_1.getSchemaPath)(activity_request_daily_list_item_hal_response_1.ActivityRequestDailyListItemHalResponse) },
                { $ref: (0, swagger_1.getSchemaPath)(activity_request_sick_leave_list_item_hal_response_1.ActivityRequestSickLeaveListItemHalResponse) },
                { $ref: (0, swagger_1.getSchemaPath)(activity_request_vacation_list_item_hal_response_1.ActivityRequestVacationListItemHalResponse) },
                { $ref: (0, swagger_1.getSchemaPath)(activity_request_performance_review_list_item_hal_response_1.ActivityRequestPerformanceReviewListItemHalResponse) }
            ]
        }
    }),
    __metadata("design:type", Array)
], UserActivityRequestListHalResponse.prototype, "requests", void 0);
//# sourceMappingURL=user-activity-request-list-hal.response.js.map