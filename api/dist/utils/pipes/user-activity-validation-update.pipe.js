"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserActivityValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const activity_request_business_trip_update_request_1 = require("../../modules/user/modules/user-activity/modules/activity-business-trip/dtos/request/activity-request-business-trip-update.request");
const activity_request_daily_update_request_1 = require("../../modules/user/modules/user-activity/modules/activity-daily/dtos/request/activity-request-daily-update.request");
const activity_request_performance_review_update_request_1 = require("../../modules/user/modules/user-activity/modules/activity-performance-review/dtos/request/activity-request-performance-review-update.request");
const user_activity_enum_1 = require("../types/enums/user-activity.enum");
let UpdateUserActivityValidationPipe = class UpdateUserActivityValidationPipe {
    validationPipe = new common_1.ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true });
    async transform(object) {
        const activity = await this.getActivity(object);
        return activity;
    }
    async getActivity(object) {
        switch (object.activityType) {
            case user_activity_enum_1.UserActivityType.BusinessTrip:
                return (await this.validationPipe.transform(object, { type: "body", metatype: activity_request_business_trip_update_request_1.ActivityRequestBusinessTripUpdateRequest }));
            case user_activity_enum_1.UserActivityType.Daily:
                return (await this.validationPipe.transform(object, { type: "body", metatype: activity_request_daily_update_request_1.ActivityRequestDailyUpdateRequest }));
            case user_activity_enum_1.UserActivityType.PerformanceReview:
                return (await this.validationPipe.transform(object, {
                    type: "body",
                    metatype: activity_request_performance_review_update_request_1.ActivityRequestPerformanceReviewUpdateRequest
                }));
            default:
                throw new common_1.BadRequestException(`Invalid activityType`);
        }
    }
};
exports.UpdateUserActivityValidationPipe = UpdateUserActivityValidationPipe;
exports.UpdateUserActivityValidationPipe = UpdateUserActivityValidationPipe = __decorate([
    (0, common_1.Injectable)()
], UpdateUserActivityValidationPipe);
//# sourceMappingURL=user-activity-validation-update.pipe.js.map