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
exports.UserAssignedVacationPatchRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("../../../../../../utils/class-transformer");
const IsLessThanOrEqual_1 = require("../../../../../../utils/class-validator/IsLessThanOrEqual");
const constants_1 = require("../../../../../../utils/constants");
const date_helper_1 = require("../../../../../../utils/helpers/date.helper");
const previousYear = date_helper_1.DateHelper.subtract(new Date(), 1, "years");
const startOfPreviousYear = date_helper_1.DateHelper.getStartOfYear(previousYear);
class UserAssignedVacationPatchRequest {
    id;
    year;
    assignedDays;
    description;
    oldVacationExpiration;
    initialUsedDays;
    initialDate;
}
exports.UserAssignedVacationPatchRequest = UserAssignedVacationPatchRequest;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UserAssignedVacationPatchRequest.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2024 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1970),
    __metadata("design:type", Number)
], UserAssignedVacationPatchRequest.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UserAssignedVacationPatchRequest.prototype, "assignedDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Description for assigned vacation" }),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_128),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserAssignedVacationPatchRequest.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "02-01", description: "Date when old vacation expires (day and month are relevant and year is irrelevant)" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.DateToMMDDFormat)(),
    __metadata("design:type", String)
], UserAssignedVacationPatchRequest.prototype, "oldVacationExpiration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 17 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Validate)(IsLessThanOrEqual_1.IsLessThanOrEqual, ["assignedDays"]),
    __metadata("design:type", Number)
], UserAssignedVacationPatchRequest.prototype, "initialUsedDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-11-01" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.IsoDateStringToUtcDate)(10),
    (0, class_validator_1.MinDate)(startOfPreviousYear),
    __metadata("design:type", Date)
], UserAssignedVacationPatchRequest.prototype, "initialDate", void 0);
//# sourceMappingURL=user-assigned-vacation-patch.request.js.map