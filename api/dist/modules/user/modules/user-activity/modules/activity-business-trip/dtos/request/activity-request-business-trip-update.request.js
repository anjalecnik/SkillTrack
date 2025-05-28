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
exports.ActivityRequestBusinessTripUpdateRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("../../../../../../../../utils/class-transformer");
const class_validator_2 = require("../../../../../../../../utils/class-validator");
const constants_1 = require("../../../../../../../../utils/constants");
const dtos_1 = require("../../../../../../../../utils/types/dtos");
const user_activity_enum_1 = require("../../../../../../../../utils/types/enums/user-activity.enum");
class ActivityRequestBusinessTripUpdateRequest {
    activityType;
    dateStart;
    dateEnd;
    projectId;
    description;
    location;
    distanceInKM;
    accommodationCost;
    foodCost;
    otherCost;
}
exports.ActivityRequestBusinessTripUpdateRequest = ActivityRequestBusinessTripUpdateRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Activity type", enum: user_activity_enum_1.UserActivityType, example: user_activity_enum_1.UserActivityType.BusinessTrip }),
    (0, class_validator_1.IsEnum)(user_activity_enum_1.UserActivityType),
    (0, class_validator_1.IsIn)([user_activity_enum_1.UserActivityType.BusinessTrip]),
    __metadata("design:type", String)
], ActivityRequestBusinessTripUpdateRequest.prototype, "activityType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Start date of activity", type: dtos_1.DateTimeWithoutTimezoneRequest }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.IsoDateObjectToUtcDate)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ActivityRequestBusinessTripUpdateRequest.prototype, "dateStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "End date of activity", type: dtos_1.DateTimeWithoutTimezoneRequest }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.IsoDateObjectToUtcDate)(),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.Validate)(class_validator_2.IsAfterOrEqualDate, ["dateStart"]),
    __metadata("design:type", Date)
], ActivityRequestBusinessTripUpdateRequest.prototype, "dateEnd", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Project id", example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ActivityRequestBusinessTripUpdateRequest.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Description of business trip", example: "Q1 planning" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_1024),
    __metadata("design:type", String)
], ActivityRequestBusinessTripUpdateRequest.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Location of business trip", example: "Maribor Slovenia" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_256),
    __metadata("design:type", String)
], ActivityRequestBusinessTripUpdateRequest.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Distance of business trip", example: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ActivityRequestBusinessTripUpdateRequest.prototype, "distanceInKM", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Accommodation cost in EUR", example: 120.5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ActivityRequestBusinessTripUpdateRequest.prototype, "accommodationCost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Food cost in EUR", example: 45.0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ActivityRequestBusinessTripUpdateRequest.prototype, "foodCost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Other costs in EUR", example: 30.0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ActivityRequestBusinessTripUpdateRequest.prototype, "otherCost", void 0);
//# sourceMappingURL=activity-request-business-trip-update.request.js.map