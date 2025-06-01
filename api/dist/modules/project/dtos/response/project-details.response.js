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
exports.ProjectDetailsResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const project_status_enum_1 = require("../../../../utils/types/enums/project-status.enum");
const project_enum_1 = require("../../../../utils/types/enums/project.enum");
const project_participant_short_response_1 = require("./project-participant-short.response");
class ProjectDetailsResponse {
    id;
    name;
    status;
    type;
    dateStart;
    dateEnd;
    participants;
    totalHours;
    totalDays;
}
exports.ProjectDetailsResponse = ProjectDetailsResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ProjectDetailsResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Name of project", example: "Jam system jam downtown studio project" }),
    __metadata("design:type", String)
], ProjectDetailsResponse.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: project_status_enum_1.ProjectStatus.Active, enum: project_status_enum_1.ProjectStatus }),
    __metadata("design:type", String)
], ProjectDetailsResponse.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: project_enum_1.ProjectType.Internal, enum: project_enum_1.ProjectType }),
    __metadata("design:type", String)
], ProjectDetailsResponse.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-11-11" }),
    __metadata("design:type", String)
], ProjectDetailsResponse.prototype, "dateStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-11-12" }),
    __metadata("design:type", String)
], ProjectDetailsResponse.prototype, "dateEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: project_participant_short_response_1.ProjectParticipantShortResponse, isArray: true }),
    __metadata("design:type", Array)
], ProjectDetailsResponse.prototype, "participants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1245 }),
    __metadata("design:type", Number)
], ProjectDetailsResponse.prototype, "totalHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 139 }),
    __metadata("design:type", Number)
], ProjectDetailsResponse.prototype, "totalDays", void 0);
//# sourceMappingURL=project-details.response.js.map