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
exports.UserProjectPatchRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const project_user_role_enum_1 = require("../../../../../utils/types/enums/project-user-role.enum");
class UserProjectPatchRequest {
    id;
    role;
    assignedPercentage;
}
exports.UserProjectPatchRequest = UserProjectPatchRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Id of project", example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UserProjectPatchRequest.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User role", example: project_user_role_enum_1.ProjectUserRole.Lead }),
    (0, class_validator_1.IsEnum)(project_user_role_enum_1.ProjectUserRole),
    __metadata("design:type", String)
], UserProjectPatchRequest.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Percentage of users time spent on the project", example: 50 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], UserProjectPatchRequest.prototype, "assignedPercentage", void 0);
//# sourceMappingURL=user-project-patch.request.js.map