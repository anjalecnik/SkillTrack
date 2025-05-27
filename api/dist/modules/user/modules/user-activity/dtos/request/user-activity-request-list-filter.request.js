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
exports.UserActivityRequestListFilterRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const interfaces_1 = require("../../interfaces");
const class_transformer_2 = require("../../../../../../utils/class-transformer");
const class_validator_2 = require("../../../../../../utils/class-validator");
const user_activity_status_enum_1 = require("../../../../../../utils/types/enums/user-activity-status.enum");
const user_activity_enum_1 = require("../../../../../../utils/types/enums/user-activity.enum");
class UserActivityRequestListFilterRequest {
    ids;
    reportedByUserIds;
    fromDateStart;
    toDateEnd;
    statuses;
    types;
    projectIds;
    fullName;
    sort = "dateStart";
    sortingDir = "desc";
}
exports.UserActivityRequestListFilterRequest = UserActivityRequestListFilterRequest;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [1], isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsPositive)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], UserActivityRequestListFilterRequest.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [1], isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsPositive)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], UserActivityRequestListFilterRequest.prototype, "reportedByUserIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-01-01" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.IsoDateStringToUtcDate)(10),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UserActivityRequestListFilterRequest.prototype, "fromDateStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-01-01" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.IsoDateStringToUtcDate)(10),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.Validate)(class_validator_2.IsAfterOrEqualDate, ["fromDateStart"]),
    __metadata("design:type", Date)
], UserActivityRequestListFilterRequest.prototype, "toDateEnd", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_activity_status_enum_1.UserActivityStatus, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsEnum)(user_activity_status_enum_1.UserActivityStatus, { each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UserActivityRequestListFilterRequest.prototype, "statuses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_activity_enum_1.UserActivityType, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsEnum)(user_activity_enum_1.UserActivityType, { each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UserActivityRequestListFilterRequest.prototype, "types", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [1], isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsPositive)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], UserActivityRequestListFilterRequest.prototype, "projectIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Bob" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserActivityRequestListFilterRequest.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: "dateStart" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(interfaces_1.sortingFieldUserActivityRequestValidationArray),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserActivityRequestListFilterRequest.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: "desc", enum: ["asc", "desc"] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserActivityRequestListFilterRequest.prototype, "sortingDir", void 0);
//# sourceMappingURL=user-activity-request-list-filter.request.js.map