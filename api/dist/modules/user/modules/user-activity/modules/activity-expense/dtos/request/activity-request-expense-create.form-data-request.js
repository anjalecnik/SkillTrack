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
exports.ActivityRequestExpenseCreateFormDataRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_transformer_2 = require("../../../../../../../../utils/class-transformer");
const constants_1 = require("../../../../../../../../utils/constants");
const user_activity_enum_1 = require("../../../../../../../../utils/types/enums/user-activity.enum");
class ActivityRequestExpenseCreateFormDataRequest {
    activityType;
    projectId;
    date;
    valueInEuro;
    isPaidWithCompanyCard;
    description;
}
exports.ActivityRequestExpenseCreateFormDataRequest = ActivityRequestExpenseCreateFormDataRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Activity type", enum: user_activity_enum_1.UserActivityType, example: user_activity_enum_1.UserActivityType.Expense }),
    (0, class_validator_1.IsEnum)(user_activity_enum_1.UserActivityType),
    (0, class_validator_1.IsIn)([user_activity_enum_1.UserActivityType.Expense]),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ActivityRequestExpenseCreateFormDataRequest.prototype, "activityType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Project id", example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ActivityRequestExpenseCreateFormDataRequest.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Date of activity", example: "2024-01-01" }),
    (0, class_transformer_2.IsoDateStringToUtcDate)(10),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ActivityRequestExpenseCreateFormDataRequest.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Value in euro", example: 10 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(0.01),
    (0, class_validator_1.Max)(10000000),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ActivityRequestExpenseCreateFormDataRequest.prototype, "valueInEuro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Company card", example: true }),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", Boolean)
], ActivityRequestExpenseCreateFormDataRequest.prototype, "isPaidWithCompanyCard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Description of expense", example: "Pizza party" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_1024),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ActivityRequestExpenseCreateFormDataRequest.prototype, "description", void 0);
//# sourceMappingURL=activity-request-expense-create.form-data-request.js.map