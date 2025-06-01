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
exports.ProjectOverviewPaginationFilterRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_transformer_2 = require("../../../../utils/class-transformer");
const dtos_1 = require("../../../../utils/types/dtos");
const project_status_enum_1 = require("../../../../utils/types/enums/project-status.enum");
const interfaces_1 = require("../../interfaces");
class ProjectOverviewPaginationFilterRequest extends dtos_1.PaginationPropsRequest {
    ids;
    name;
    statuses;
    sort = "id";
    metadata;
    userIds;
}
exports.ProjectOverviewPaginationFilterRequest = ProjectOverviewPaginationFilterRequest;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [1, 2, 3], isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsPositive)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], ProjectOverviewPaginationFilterRequest.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Magnum" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProjectOverviewPaginationFilterRequest.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [project_status_enum_1.ProjectStatus.Active], isArray: true, enum: project_status_enum_1.ProjectStatus }),
    (0, class_validator_1.IsEnum)(project_status_enum_1.ProjectStatus, { each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ProjectOverviewPaginationFilterRequest.prototype, "statuses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "id", default: "id", enum: interfaces_1.sortingFieldProjectValidationArray }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(interfaces_1.sortingFieldProjectValidationArray),
    __metadata("design:type", String)
], ProjectOverviewPaginationFilterRequest.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseOptionalBoolean)(),
    __metadata("design:type", Boolean)
], ProjectOverviewPaginationFilterRequest.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [1, 2, 3], isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsPositive)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], ProjectOverviewPaginationFilterRequest.prototype, "userIds", void 0);
//# sourceMappingURL=project-overview-pagination-filter.request.js.map