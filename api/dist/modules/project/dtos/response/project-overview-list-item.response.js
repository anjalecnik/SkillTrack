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
exports.ProjectOverviewListItemResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const project_status_enum_1 = require("../../../../utils/types/enums/project-status.enum");
const project_participant_short_response_1 = require("./project-participant-short.response");
class ProjectOverviewListItemResponse {
    id;
    name;
    status;
    dateStart;
    dateEnd;
    participants;
    totalHours;
}
exports.ProjectOverviewListItemResponse = ProjectOverviewListItemResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ProjectOverviewListItemResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Name of workspace project", example: "Jam system jam downtown studio project" }),
    __metadata("design:type", String)
], ProjectOverviewListItemResponse.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: project_status_enum_1.ProjectStatus.Active }),
    __metadata("design:type", String)
], ProjectOverviewListItemResponse.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-11-11" }),
    __metadata("design:type", String)
], ProjectOverviewListItemResponse.prototype, "dateStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2024-11-12" }),
    __metadata("design:type", String)
], ProjectOverviewListItemResponse.prototype, "dateEnd", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: project_participant_short_response_1.ProjectParticipantShortResponse, isArray: true }),
    __metadata("design:type", Array)
], ProjectOverviewListItemResponse.prototype, "participants", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1245 }),
    __metadata("design:type", Number)
], ProjectOverviewListItemResponse.prototype, "totalHours", void 0);
//# sourceMappingURL=project-overview-list-item.response.js.map