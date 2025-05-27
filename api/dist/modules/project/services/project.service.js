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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const date_helper_1 = require("../../../utils/helpers/date.helper");
const project_repository_1 = require("../repository/project.repository");
const project_status_enum_1 = require("../../../utils/types/enums/project-status.enum");
let ProjectService = class ProjectService {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async getProject(projectGetRequest) {
        const projectEntity = await this.projectRepository.getProjectOrThrow(projectGetRequest);
        return this.getProjectDetails(projectEntity);
    }
    async getProjectList(filters) {
        const pagination = await this.projectRepository.getProjectList(filters);
        const data = filters.metadata ? await this.enrichProjectData(pagination) : pagination.data;
        return { meta: pagination.meta, data };
    }
    async createProject(projectCreateRequest) {
        const timezone = "Europe/Ljubljana";
        const dateStart = date_helper_1.DateHelper.subtractWorkspaceOffset(timezone, date_helper_1.DateHelper.getStartOfDay(new Date()));
        const projectDetailsDBResponse = await this.projectRepository.createProject(projectCreateRequest, dateStart);
        return this.getProjectDBDetails(projectDetailsDBResponse);
    }
    async updateProject(projectPatchRequest) {
        const dateStart = projectPatchRequest.dateStart ? date_helper_1.DateHelper.getStartOfDay(projectPatchRequest.dateStart) : undefined;
        const dateEnd = projectPatchRequest.dateEnd ? date_helper_1.DateHelper.getEndOfDay(projectPatchRequest.dateEnd) : projectPatchRequest.dateEnd;
        const projectDetailsDBResponse = await this.projectRepository.updateProject({ ...projectPatchRequest, dateStart, dateEnd });
        return this.getProjectDBDetails(projectDetailsDBResponse);
    }
    async deleteProjects(projectDeleteRequest) {
        await this.projectRepository.softDeleteProjects(projectDeleteRequest);
    }
    async enrichProjectData(pagination) {
        return Promise.all(pagination.data.map(async (project) => {
            const projectOverview = await this.getProjectOverview(project);
            return {
                ...project,
                participants: projectOverview.projectParticipantEntities,
                status: projectOverview.status,
                totalHours: projectOverview.totalHours
            };
        }));
    }
    async getProjectOverview(projectEntity) {
        const [projectParticipantEntities, totalHours] = await Promise.all([
            this.projectRepository.getProjectParticipants(projectEntity.id),
            this.projectRepository.calculateProjectTotalHours(projectEntity.id)
        ]);
        return {
            projectEntity,
            projectParticipantEntities,
            status: this.getProjectStatus(projectEntity.dateStart, projectEntity.dateEnd),
            totalHours
        };
    }
    async getProjectDetails(projectEntity) {
        const projectOverview = await this.getProjectOverview(projectEntity);
        return {
            ...projectOverview,
            status: this.getProjectStatus(projectEntity.dateStart, projectEntity.dateEnd),
            totalDays: this.getProjectTotalDays(projectEntity.dateStart, projectEntity.dateEnd)
        };
    }
    getProjectDBDetails(projectDetailsDBResponse) {
        return {
            projectEntity: projectDetailsDBResponse.projectEntity,
            projectParticipantEntities: projectDetailsDBResponse.projectParticipantEntities,
            status: this.getProjectStatus(projectDetailsDBResponse.projectEntity.dateStart, projectDetailsDBResponse.projectEntity.dateEnd),
            totalHours: projectDetailsDBResponse.userActivityEntities.reduce((acc, current) => acc + (current.hours ?? 0), 0),
            totalDays: this.getProjectTotalDays(projectDetailsDBResponse.projectEntity.dateStart, projectDetailsDBResponse.projectEntity.dateEnd)
        };
    }
    getProjectStatus(dateStart, dateEnd) {
        const now = new Date();
        if (now.getTime() < dateStart.getTime()) {
            return project_status_enum_1.ProjectStatus.Future;
        }
        if (!dateEnd || date_helper_1.DateHelper.isDateAfterDate(now, dateEnd)) {
            return project_status_enum_1.ProjectStatus.Active;
        }
        return project_status_enum_1.ProjectStatus.Inactive;
    }
    getProjectTotalDays(dateStart, dateEnd) {
        const now = new Date();
        if (now.getTime() < dateStart.getTime()) {
            return 0;
        }
        if (dateEnd && dateEnd.getTime() < now.getTime()) {
            return date_helper_1.DateHelper.calculateDaysBetweenDates(dateStart, dateEnd);
        }
        return date_helper_1.DateHelper.calculateDaysBetweenDates(dateStart, now);
    }
    filterProjectForUserHub(projectDetails, authUser) {
        const currentUser = projectDetails.projectParticipantEntities.find(participant => participant.id === authUser.id);
        if (currentUser) {
            projectDetails.projectParticipantEntities = [currentUser];
            return projectDetails;
        }
        throw new common_1.NotFoundException("User is not a member of this project");
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [project_repository_1.ProjectRepository])
], ProjectService);
//# sourceMappingURL=project.service.js.map