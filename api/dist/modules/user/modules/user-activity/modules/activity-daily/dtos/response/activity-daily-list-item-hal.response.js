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
exports.ActivityDailyListItemHalResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const activity_request_list_item_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response");
const user_working_hours_list_item_response_1 = require("../../../../../user-working-hours/dtos/response/user-working-hours-list-item.response");
const user_activity_work_location_enum_1 = require("../../../../../../../../utils/types/enums/user-activity-work-location.enum");
class ActivityDailyListItemHalResponse extends activity_request_list_item_hal_base_response_1.ActivityRequestListItemHalBaseResponse {
    date;
    hours;
    workLocation;
    reviewedByUserId;
    workingHours;
}
exports.ActivityDailyListItemHalResponse = ActivityDailyListItemHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01" }),
    __metadata("design:type", String)
], ActivityDailyListItemHalResponse.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ActivityDailyListItemHalResponse.prototype, "hours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: user_activity_work_location_enum_1.UserActivityWorkLocation.Home, enum: user_activity_work_location_enum_1.UserActivityWorkLocation }),
    __metadata("design:type", String)
], ActivityDailyListItemHalResponse.prototype, "workLocation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], ActivityDailyListItemHalResponse.prototype, "reviewedByUserId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: user_working_hours_list_item_response_1.UserWorkingHoursListItemResponse }),
    __metadata("design:type", user_working_hours_list_item_response_1.UserWorkingHoursListItemResponse)
], ActivityDailyListItemHalResponse.prototype, "workingHours", void 0);
//# sourceMappingURL=activity-daily-list-item-hal.response.js.map