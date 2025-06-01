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
exports.UserProjectsShortResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const project_user_role_enum_1 = require("../../../../utils/types/enums/project-user-role.enum");
class UserProjectsShortResponse {
    id;
    name;
    role;
    assignedPercentage;
    startDate;
    endDate;
}
exports.UserProjectsShortResponse = UserProjectsShortResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserProjectsShortResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Name of project", example: "Jam system jam downtown studio project" }),
    __metadata("design:type", String)
], UserProjectsShortResponse.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User role", example: project_user_role_enum_1.ProjectUserRole.Lead }),
    __metadata("design:type", String)
], UserProjectsShortResponse.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Assigner percentage for project", example: 50 }),
    __metadata("design:type", Number)
], UserProjectsShortResponse.prototype, "assignedPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-10-20" }),
    __metadata("design:type", String)
], UserProjectsShortResponse.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-11-11" }),
    __metadata("design:type", String)
], UserProjectsShortResponse.prototype, "endDate", void 0);
//# sourceMappingURL=user-projects-short.response.js.map