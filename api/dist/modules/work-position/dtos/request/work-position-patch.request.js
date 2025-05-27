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
exports.WorkPositionPatchRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const work_position_enum_1 = require("../../../../utils/types/enums/work-position.enum");
class WorkPositionPatchRequest {
    name;
    level;
    workPositionPromotionId;
    description;
}
exports.WorkPositionPatchRequest = WorkPositionPatchRequest;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Work position name", example: "Junior Backend Developer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], WorkPositionPatchRequest.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Work position level [L01 - L10]", example: work_position_enum_1.WorkPositionLevel.L03, enum: work_position_enum_1.WorkPositionLevel }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(work_position_enum_1.WorkPositionLevel),
    __metadata("design:type", String)
], WorkPositionPatchRequest.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Reference to promotion work position id", example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], WorkPositionPatchRequest.prototype, "workPositionPromotionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Description of work position", example: "Responsible for building REST Api" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], WorkPositionPatchRequest.prototype, "description", void 0);
//# sourceMappingURL=work-position-patch.request.js.map