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
exports.ProjectParticipantShortResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const project_user_role_enum_1 = require("../../../../utils/types/enums/project-user-role.enum");
class ProjectParticipantShortResponse {
    id;
    name;
    surname;
    middleName;
    projectRole;
}
exports.ProjectParticipantShortResponse = ProjectParticipantShortResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Participant id", example: 1 }),
    __metadata("design:type", Number)
], ProjectParticipantShortResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Participant name", example: "Joe" }),
    __metadata("design:type", String)
], ProjectParticipantShortResponse.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Participant surname", example: "The" }),
    __metadata("design:type", String)
], ProjectParticipantShortResponse.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Participant middle name", example: "Mishica" }),
    __metadata("design:type", String)
], ProjectParticipantShortResponse.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Participant role", example: project_user_role_enum_1.ProjectUserRole.Lead }),
    __metadata("design:type", String)
], ProjectParticipantShortResponse.prototype, "projectRole", void 0);
//# sourceMappingURL=project-participant-short.response.js.map