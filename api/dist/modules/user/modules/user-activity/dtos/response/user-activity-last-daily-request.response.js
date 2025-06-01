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
exports.UserActivityLastDailyRequestResponse = exports.UserActivityLastDailyRequestResponseEmbedded = void 0;
const swagger_1 = require("@nestjs/swagger");
const activity_request_daily_list_item_hal_response_1 = require("../../modules/activity-daily/dtos/response/activity-request-daily-list-item-hal.response");
class UserActivityLastDailyRequestResponseEmbedded extends activity_request_daily_list_item_hal_response_1.ActivityRequestDailyListItemEmbeddedItemsHalResponse {
    workHours;
}
exports.UserActivityLastDailyRequestResponseEmbedded = UserActivityLastDailyRequestResponseEmbedded;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: activity_request_daily_list_item_hal_response_1.ActivityRequestDailyActivityListItemEmbeddedActivityHalResponse, isArray: true }),
    __metadata("design:type", Array)
], UserActivityLastDailyRequestResponseEmbedded.prototype, "workHours", void 0);
class UserActivityLastDailyRequestResponse extends activity_request_daily_list_item_hal_response_1.ActivityRequestDailyListItemHalResponse {
}
exports.UserActivityLastDailyRequestResponse = UserActivityLastDailyRequestResponse;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: UserActivityLastDailyRequestResponseEmbedded }),
    __metadata("design:type", UserActivityLastDailyRequestResponseEmbedded)
], UserActivityLastDailyRequestResponse.prototype, "_embedded", void 0);
//# sourceMappingURL=user-activity-last-daily-request.response.js.map