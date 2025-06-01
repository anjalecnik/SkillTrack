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
exports.ActivityRequestDailyUpdateRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const user_working_hours_daily_create_request_1 = require("../../../../../user-working-hours/dtos/request/user-working-hours-daily-create.request");
const class_transformer_2 = require("../../../../../../../../utils/class-transformer");
const user_activity_work_location_enum_1 = require("../../../../../../../../utils/types/enums/user-activity-work-location.enum");
const user_activity_enum_1 = require("../../../../../../../../utils/types/enums/user-activity.enum");
class ActivityRequestDailyUpdateRequest {
    activityType;
    date;
    workLocation;
    lunch = false;
    workingHours;
}
exports.ActivityRequestDailyUpdateRequest = ActivityRequestDailyUpdateRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Activity type", enum: user_activity_enum_1.UserActivityType, example: user_activity_enum_1.UserActivityType.Daily }),
    (0, class_validator_1.IsEnum)(user_activity_enum_1.UserActivityType),
    (0, class_validator_1.IsIn)([user_activity_enum_1.UserActivityType.Daily]),
    __metadata("design:type", String)
], ActivityRequestDailyUpdateRequest.prototype, "activityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Date of activity", example: "2024-01-01" }),
    (0, class_transformer_2.IsoDateStringToUtcDate)(10),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ActivityRequestDailyUpdateRequest.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Work location", enum: user_activity_work_location_enum_1.UserActivityWorkLocation, example: user_activity_work_location_enum_1.UserActivityWorkLocation.Office }),
    (0, class_validator_1.IsEnum)(user_activity_work_location_enum_1.UserActivityWorkLocation),
    __metadata("design:type", String)
], ActivityRequestDailyUpdateRequest.prototype, "workLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ActivityRequestDailyUpdateRequest.prototype, "lunch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Working hours", type: user_working_hours_daily_create_request_1.UserWorkingHoursDailyCreateRequest }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => user_working_hours_daily_create_request_1.UserWorkingHoursDailyCreateRequest),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], ActivityRequestDailyUpdateRequest.prototype, "workingHours", void 0);
//# sourceMappingURL=activity-request-daily-update.request.js.map