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
exports.UserActivityRequestPaginationFilterRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const interfaces_1 = require("../../interfaces");
const class_transformer_2 = require("../../../../../../utils/class-transformer");
const class_validator_2 = require("../../../../../../utils/class-validator");
const dtos_1 = require("../../../../../../utils/types/dtos");
const user_activity_status_enum_1 = require("../../../../../../utils/types/enums/user-activity-status.enum");
const user_activity_enum_1 = require("../../../../../../utils/types/enums/user-activity.enum");
class UserActivityRequestPaginationFilterRequest extends dtos_1.PaginationPropsRequest {
    fromDateStart;
    toDateEnd;
    statuses;
    types;
    projectIds;
    fullName;
    showSubordinatesByLevel = 0;
    sort = "dateStart";
    sortingDir = "asc";
    forceShowDataForUserInParams = false;
}
exports.UserActivityRequestPaginationFilterRequest = UserActivityRequestPaginationFilterRequest;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-01-01" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.IsoDateStringToUtcDate)(10),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UserActivityRequestPaginationFilterRequest.prototype, "fromDateStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-01-01" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.IsoDateStringToUtcDate)(10),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.Validate)(class_validator_2.IsAfterOrEqualDate, ["fromDateStart"]),
    __metadata("design:type", Date)
], UserActivityRequestPaginationFilterRequest.prototype, "toDateEnd", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_activity_status_enum_1.UserActivityStatus, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsEnum)(user_activity_status_enum_1.UserActivityStatus, { each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UserActivityRequestPaginationFilterRequest.prototype, "statuses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_activity_enum_1.UserActivityType, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsEnum)(user_activity_enum_1.UserActivityType, { each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UserActivityRequestPaginationFilterRequest.prototype, "types", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [1], isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsPositive)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], UserActivityRequestPaginationFilterRequest.prototype, "projectIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Bob" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserActivityRequestPaginationFilterRequest.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UserActivityRequestPaginationFilterRequest.prototype, "showSubordinatesByLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: "dateStart" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(interfaces_1.sortingFieldUserActivityPaginationRequestValidationArray),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserActivityRequestPaginationFilterRequest.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: "asc", enum: ["asc", "desc"] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserActivityRequestPaginationFilterRequest.prototype, "sortingDir", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], UserActivityRequestPaginationFilterRequest.prototype, "forceShowDataForUserInParams", void 0);
//# sourceMappingURL=user-activity-request-pagination-filter.request.js.map