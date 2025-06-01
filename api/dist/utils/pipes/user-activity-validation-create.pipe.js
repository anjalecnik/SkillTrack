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
exports.CreateUserActivityValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const activity_request_business_trip_create_request_1 = require("../../modules/user/modules/user-activity/modules/activity-business-trip/dtos/request/activity-request-business-trip-create.request");
const activity_request_daily_create_request_1 = require("../../modules/user/modules/user-activity/modules/activity-daily/dtos/request/activity-request-daily-create.request");
const activity_request_performance_review_create_request_1 = require("../../modules/user/modules/user-activity/modules/activity-performance-review/dtos/request/activity-request-performance-review-create.request");
const activity_request_sick_leave_create_request_1 = require("../../modules/user/modules/user-activity/modules/activity-sick-leave/dtos/request/activity-request-sick-leave-create.request");
const activity_request_vacation_create_request_1 = require("../../modules/user/modules/user-activity/modules/activity-vacation/dtos/request/activity-request-vacation-create.request");
const user_activity_enum_1 = require("../types/enums/user-activity.enum");
let CreateUserActivityValidationPipe = class CreateUserActivityValidationPipe {
    validationPipe;
    constructor(validationPipe) {
        this.validationPipe = validationPipe;
    }
    async transform(object) {
        const activity = await this.getActivity(object);
        return activity;
    }
    async getActivity(object) {
        switch (object.activityType) {
            case user_activity_enum_1.UserActivityType.BusinessTrip:
                return (await this.validationPipe.transform(object, { type: "body", metatype: activity_request_business_trip_create_request_1.ActivityRequestBusinessTripCreateRequest }));
            case user_activity_enum_1.UserActivityType.Daily:
                return (await this.validationPipe.transform(object, { type: "body", metatype: activity_request_daily_create_request_1.ActivityRequestDailyCreateRequest }));
            case user_activity_enum_1.UserActivityType.SickLeave:
                return (await this.validationPipe.transform(object, { type: "body", metatype: activity_request_sick_leave_create_request_1.ActivityRequestSickLeaveCreateRequest }));
            case user_activity_enum_1.UserActivityType.Vacation:
                return (await this.validationPipe.transform(object, { type: "body", metatype: activity_request_vacation_create_request_1.ActivityRequestVacationCreateRequest }));
            case user_activity_enum_1.UserActivityType.PerformanceReview:
                return (await this.validationPipe.transform(object, {
                    type: "body",
                    metatype: activity_request_performance_review_create_request_1.ActivityRequestPerformanceReviewCreateRequest
                }));
            default: {
                throw new common_1.BadRequestException(`Invalid activityType`);
            }
        }
    }
};
exports.CreateUserActivityValidationPipe = CreateUserActivityValidationPipe;
exports.CreateUserActivityValidationPipe = CreateUserActivityValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.ValidationPipe])
], CreateUserActivityValidationPipe);
//# sourceMappingURL=user-activity-validation-create.pipe.js.map