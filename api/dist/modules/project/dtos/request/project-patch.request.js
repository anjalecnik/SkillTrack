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
exports.ProjectPatchRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("../../../../utils/class-transformer");
const constants_1 = require("../../../../utils/constants");
const project_enum_1 = require("../../../../utils/types/enums/project.enum");
class ProjectPatchRequest {
    name;
    type;
    dateStart;
    dateEnd;
}
exports.ProjectPatchRequest = ProjectPatchRequest;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "InovaIT" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_64),
    __metadata("design:type", String)
], ProjectPatchRequest.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: project_enum_1.ProjectType.Internal }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(project_enum_1.ProjectType),
    __metadata("design:type", String)
], ProjectPatchRequest.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-08-25" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.IsoDateStringToUtcDate)(10),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ProjectPatchRequest.prototype, "dateStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-08-25" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.IsoDateStringToUtcDate)(10),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], ProjectPatchRequest.prototype, "dateEnd", void 0);
//# sourceMappingURL=project-patch.request.js.map