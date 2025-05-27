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
exports.UserActivityListHalResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const activity_business_trip_list_item_hal_response_1 = require("../../modules/activity-business-trip/dtos/response/activity-business-trip-list-item-hal.response");
const activity_daily_list_item_hal_response_1 = require("../../modules/activity-daily/dtos/response/activity-daily-list-item-hal.response");
const activity_sick_leave_list_item_hal_response_1 = require("../../modules/activity-sick-leave/dtos/response/activity-sick-leave-list-item-hal.response");
const activity_vacation_list_item_hal_response_1 = require("../../modules/activity-vacation/dtos/response/activity-vacation-list-item-hal.response");
const activity_performance_review_list_item_hal_response_1 = require("../../modules/activity-performance-review/dtos/response/activity-performance-review-list-item-hal.response");
const activity_lunch_list_item_hal_response_1 = require("../../modules/activity-lunch/dtos/response/activity-lunch-list-item-hal.response");
const dtos_1 = require("../../../../../../utils/types/dtos");
class UserActivityListHalResponse extends dtos_1.HalResourceResponse {
    activities;
}
exports.UserActivityListHalResponse = UserActivityListHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "array",
        items: {
            oneOf: [
                { $ref: (0, swagger_1.getSchemaPath)(activity_business_trip_list_item_hal_response_1.ActivityBusinessTripListItemHalResponse) },
                { $ref: (0, swagger_1.getSchemaPath)(activity_daily_list_item_hal_response_1.ActivityDailyListItemHalResponse) },
                { $ref: (0, swagger_1.getSchemaPath)(activity_sick_leave_list_item_hal_response_1.ActivitySickLeaveListItemHalResponse) },
                { $ref: (0, swagger_1.getSchemaPath)(activity_vacation_list_item_hal_response_1.ActivityVacationListItemHalResponse) },
                { $ref: (0, swagger_1.getSchemaPath)(activity_performance_review_list_item_hal_response_1.ActivityPerformanceReviewListItemHalResponse) },
                { $ref: (0, swagger_1.getSchemaPath)(activity_lunch_list_item_hal_response_1.ActivityLunchListItemHalResponse) }
            ]
        }
    }),
    __metadata("design:type", Array)
], UserActivityListHalResponse.prototype, "activities", void 0);
//# sourceMappingURL=user-activity-list-hal.response.js.map