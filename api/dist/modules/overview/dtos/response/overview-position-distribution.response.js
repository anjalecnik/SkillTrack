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
exports.OverviewPositionDistributionResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class OverviewPositionDistributionResponse {
    cloud;
    database;
    other;
}
exports.OverviewPositionDistributionResponse = OverviewPositionDistributionResponse;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 30, description: "Number of employees working as Cloud Infrastructure Engineers" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OverviewPositionDistributionResponse.prototype, "cloud", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 20, description: "Number of employees working as Database Engineers" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OverviewPositionDistributionResponse.prototype, "database", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 50, description: "Number of employees in other roles not categorized above" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OverviewPositionDistributionResponse.prototype, "other", void 0);
//# sourceMappingURL=overview-position-distribution.response.js.map