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
exports.ActivityRequestDailyListItemHalResponse = exports.ActivityRequestDailyListItemEmbeddedItemsHalResponse = exports.ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_working_hours_list_item_response_1 = require("../../../../../user-working-hours/dtos/response/user-working-hours-list-item.response");
const activity_request_embedded_activity_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-request-embedded-activity-hal-base.response");
const activity_request_embedded_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-request-embedded-hal-base.response");
const activity_request_list_item_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response");
const user_activity_work_location_enum_1 = require("../../../../../../../../utils/types/enums/user-activity-work-location.enum");
class ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse extends activity_request_embedded_activity_hal_base_response_1.ActivityRequestEmbeddedActivityHalBaseResponse {
    projectId;
    projectName;
    hours;
    workLocation;
    workingHour;
}
exports.ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse = ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "bob's project" }),
    __metadata("design:type", String)
], ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse.prototype, "projectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse.prototype, "hours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: user_activity_work_location_enum_1.UserActivityWorkLocation.Home, enum: user_activity_work_location_enum_1.UserActivityWorkLocation }),
    __metadata("design:type", String)
], ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse.prototype, "workLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_working_hours_list_item_response_1.UserWorkingHoursListItemResponse }),
    __metadata("design:type", user_working_hours_list_item_response_1.UserWorkingHoursListItemResponse)
], ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse.prototype, "workingHour", void 0);
class ActivityRequestDailyListItemEmbeddedItemsHalResponse extends activity_request_embedded_hal_base_response_1.ActivityRequestEmbeddedHalBaseResponse {
    activities;
}
exports.ActivityRequestDailyListItemEmbeddedItemsHalResponse = ActivityRequestDailyListItemEmbeddedItemsHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ type: ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse, isArray: true }),
    __metadata("design:type", Array)
], ActivityRequestDailyListItemEmbeddedItemsHalResponse.prototype, "activities", void 0);
class ActivityRequestDailyListItemHalResponse extends activity_request_list_item_hal_base_response_1.ActivityRequestListItemHalBaseResponse {
    date;
    lunch;
}
exports.ActivityRequestDailyListItemHalResponse = ActivityRequestDailyListItemHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01" }),
    __metadata("design:type", String)
], ActivityRequestDailyListItemHalResponse.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ActivityRequestDailyListItemHalResponse.prototype, "lunch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ActivityRequestDailyListItemEmbeddedItemsHalResponse }),
    __metadata("design:type", ActivityRequestDailyListItemEmbeddedItemsHalResponse)
], ActivityRequestDailyListItemHalResponse.prototype, "_embedded", void 0);
//# sourceMappingURL=activity-request-daily-list-item-hal.response.js.map