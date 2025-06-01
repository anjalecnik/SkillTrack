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
exports.UserWorkingHoursCreateRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("../../../../../../utils/class-transformer");
const dtos_1 = require("../../../../../../utils/types/dtos");
const user_activity_work_location_enum_1 = require("../../../../../../utils/types/enums/user-activity-work-location.enum");
class UserWorkingHoursCreateRequest {
    projectId;
    workLocation;
    dateTime;
}
exports.UserWorkingHoursCreateRequest = UserWorkingHoursCreateRequest;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Project id", example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Object)
], UserWorkingHoursCreateRequest.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Work location", enum: user_activity_work_location_enum_1.UserActivityWorkLocation, example: user_activity_work_location_enum_1.UserActivityWorkLocation.Home }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(user_activity_work_location_enum_1.UserActivityWorkLocation),
    __metadata("design:type", String)
], UserWorkingHoursCreateRequest.prototype, "workLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Date and time for the action of working hours", type: dtos_1.DateTimeWithoutTimezoneRequest }),
    (0, class_transformer_1.IsoDateObjectToUtcDate)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UserWorkingHoursCreateRequest.prototype, "dateTime", void 0);
//# sourceMappingURL=user-working-hours-create.request.js.map