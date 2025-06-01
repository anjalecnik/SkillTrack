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
exports.UserActivityListFilterRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_transformer_2 = require("../../../../../../utils/class-transformer");
const class_validator_2 = require("../../../../../../utils/class-validator");
const date_helper_1 = require("../../../../../../utils/helpers/date.helper");
const user_activity_status_enum_1 = require("../../../../../../utils/types/enums/user-activity-status.enum");
const user_activity_enum_1 = require("../../../../../../utils/types/enums/user-activity.enum");
const interfaces_1 = require("../../interfaces");
class UserActivityListFilterRequest {
    ids;
    reportedByUserIds;
    fromDateStart;
    toDateEnd;
    statuses;
    types;
    projectIds;
    fullName;
    virtualActivities = true;
    sort = "dateStart";
    sortingDir = "desc";
}
exports.UserActivityListFilterRequest = UserActivityListFilterRequest;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [1], isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsPositive)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], UserActivityListFilterRequest.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [1], isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsPositive)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], UserActivityListFilterRequest.prototype, "reportedByUserIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01" }),
    (0, class_transformer_2.IsoDateStringToUtcDate)(10),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UserActivityListFilterRequest.prototype, "fromDateStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01" }),
    (0, class_transformer_2.IsoDateStringToUtcDate)(10),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.Validate)(class_validator_2.IsAfterOrEqualDate, ["fromDateStart"]),
    (0, class_transformer_1.Transform)(({ value }) => date_helper_1.DateHelper.getEndOfDay(value)),
    __metadata("design:type", Date)
], UserActivityListFilterRequest.prototype, "toDateEnd", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_activity_status_enum_1.UserActivityStatus, enumName: "UserActivityStatus", isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsEnum)(user_activity_status_enum_1.UserActivityStatus, { each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UserActivityListFilterRequest.prototype, "statuses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_activity_enum_1.UserActivityType, enumName: "UserActivityType", isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsEnum)(user_activity_enum_1.UserActivityType, { each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UserActivityListFilterRequest.prototype, "types", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [1], isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsPositive)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], UserActivityListFilterRequest.prototype, "projectIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Bob" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserActivityListFilterRequest.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: "Indicates whether to include or exclude virtual activities" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === "true", { toClassOnly: true }),
    __metadata("design:type", Boolean)
], UserActivityListFilterRequest.prototype, "virtualActivities", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: "dateStart" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(interfaces_1.sortingFieldUserActivityValidationArray),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserActivityListFilterRequest.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: "desc", enum: ["asc", "desc"] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserActivityListFilterRequest.prototype, "sortingDir", void 0);
//# sourceMappingURL=user-activity-list-filter.request.js.map