"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMapper = void 0;
const common_1 = require("@nestjs/common");
const date_helper_1 = require("../../../utils/helpers/date.helper");
const project_user_role_enum_1 = require("../../../utils/types/enums/project-user-role.enum");
let ProjectMapper = class ProjectMapper {
    static mapProjectDetails({ projectEntity, projectParticipantEntities, status, totalHours, totalDays }) {
        return {
            id: projectEntity.id,
            name: projectEntity.name,
            status,
            type: projectEntity.type ?? undefined,
            dateStart: date_helper_1.DateHelper.formatIso8601DayString(projectEntity.dateStart),
            dateEnd: projectEntity.dateEnd ? date_helper_1.DateHelper.formatIso8601DayString(projectEntity.dateEnd) : undefined,
            participants: projectParticipantEntities.map(participant => this.mapProjectParticipantShort(participant, projectEntity.id)),
            totalHours,
            totalDays
        };
    }
    static mapProjectOverviewPaginationList(projects, meta) {
        return {
            meta,
            data: projects.map(project => this.mapProjectOverviewListItem(project))
        };
    }
    static mapProjectParticipantShort(member, projectId) {
        return {
            id: member.id,
            name: member.name,
            surname: member.surname,
            projectRole: member.projects.find(project => project.projectId === projectId)?.role ?? project_user_role_enum_1.ProjectUserRole.Member
        };
    }
    static mapProjectOverviewListItem(projectOverview) {
        return {
            id: projectOverview.id,
            name: projectOverview.name,
            status: projectOverview.status,
            dateStart: date_helper_1.DateHelper.formatIso8601DayString(projectOverview.dateStart),
            dateEnd: projectOverview.dateEnd ? date_helper_1.DateHelper.formatIso8601DayString(projectOverview.dateEnd) : undefined,
            participants: projectOverview.participants ? projectOverview.participants.map(participant => this.mapProjectParticipantShort(participant, projectOverview.id)) : undefined,
            totalHours: projectOverview.totalHours
        };
    }
};
exports.ProjectMapper = ProjectMapper;
exports.ProjectMapper = ProjectMapper = __decorate([
    (0, common_1.Injectable)()
], ProjectMapper);
//# sourceMappingURL=project.mapper.js.map