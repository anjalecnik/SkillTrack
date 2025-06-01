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
exports.WorkPositionPaginationFilterRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dtos_1 = require("../../../../utils/types/dtos");
const work_position_enum_1 = require("../../../../utils/types/enums/work-position.enum");
const interfaces_1 = require("../../interfaces");
class WorkPositionPaginationFilterRequest extends dtos_1.PaginationPropsRequest {
    ids;
    name;
    levels;
    sort = "id";
}
exports.WorkPositionPaginationFilterRequest = WorkPositionPaginationFilterRequest;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsPositive)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], WorkPositionPaginationFilterRequest.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Backend Developer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], WorkPositionPaginationFilterRequest.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Work position level [L01 - L10]", example: work_position_enum_1.WorkPositionLevel.L03, enum: work_position_enum_1.WorkPositionLevel, isArray: true }),
    (0, class_validator_1.IsEnum)(work_position_enum_1.WorkPositionLevel, { each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], WorkPositionPaginationFilterRequest.prototype, "levels", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "id", default: "id" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(interfaces_1.sortingFieldWorkPositionValidationArray),
    __metadata("design:type", String)
], WorkPositionPaginationFilterRequest.prototype, "sort", void 0);
//# sourceMappingURL=work-position-pagination-filter.request.js.map