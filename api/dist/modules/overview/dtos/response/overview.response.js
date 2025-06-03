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
exports.OverviewResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const overview_position_distribution_response_1 = require("./overview-position-distribution.response");
class OverviewResponse {
    members;
    projects;
    taskProgress;
    positionDistribution;
}
exports.OverviewResponse = OverviewResponse;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 42, description: "Total number of active members or employees in the organization" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], OverviewResponse.prototype, "members", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 7, description: "Total number of ongoing or registered projects" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], OverviewResponse.prototype, "projects", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 76.5, description: "Overall task completion rate (percentage of completed tasks from Jira or task system)" }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], OverviewResponse.prototype, "taskProgress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: overview_position_distribution_response_1.OverviewPositionDistributionResponse, description: "Breakdown of employees by job position" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => overview_position_distribution_response_1.OverviewPositionDistributionResponse),
    __metadata("design:type", overview_position_distribution_response_1.OverviewPositionDistributionResponse)
], OverviewResponse.prototype, "positionDistribution", void 0);
//# sourceMappingURL=overview.response.js.map