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
exports.ActivityRequestSickLeaveCreateRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("../../../../../../../../utils/class-transformer");
const class_validator_2 = require("../../../../../../../../utils/class-validator");
const constants_1 = require("../../../../../../../../utils/constants");
const user_activity_enum_1 = require("../../../../../../../../utils/types/enums/user-activity.enum");
class ActivityRequestSickLeaveCreateRequest {
    activityType;
    dateStart;
    dateEnd;
    description;
}
exports.ActivityRequestSickLeaveCreateRequest = ActivityRequestSickLeaveCreateRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Activity type", enum: user_activity_enum_1.UserActivityType, example: user_activity_enum_1.UserActivityType.SickLeave }),
    (0, class_validator_1.IsEnum)(user_activity_enum_1.UserActivityType),
    (0, class_validator_1.IsIn)([user_activity_enum_1.UserActivityType.SickLeave]),
    __metadata("design:type", String)
], ActivityRequestSickLeaveCreateRequest.prototype, "activityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Start date of activity", example: "2024-01-01" }),
    (0, class_transformer_1.IsoDateStringToUtcDate)(10),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ActivityRequestSickLeaveCreateRequest.prototype, "dateStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "End date of activity", example: "2024-01-01" }),
    (0, class_transformer_1.IsoDateStringToUtcDate)(10),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.Validate)(class_validator_2.IsAfterOrEqualDate, ["dateStart"]),
    __metadata("design:type", Date)
], ActivityRequestSickLeaveCreateRequest.prototype, "dateEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Description of sick leave", example: "Walk the plank on seven seas" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_1024),
    __metadata("design:type", String)
], ActivityRequestSickLeaveCreateRequest.prototype, "description", void 0);
//# sourceMappingURL=activity-request-sick-leave-create.request.js.map