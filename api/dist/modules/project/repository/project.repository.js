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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_user_entity_1 = require("../../../libs/db/entities/project-user.entity");
const project_entity_1 = require("../../../libs/db/entities/project.entity");
const user_activity_entity_1 = require("../../../libs/db/entities/user-activity.entity");
const master_data_source_service_1 = require("../../../libs/db/master-data-source.service");
const pagination_helper_1 = require("../../../utils/helpers/pagination.helper");
const typeorm_2 = require("typeorm");
const project_user_role_enum_1 = require("../../../utils/types/enums/project-user-role.enum");
const user_activity_enum_1 = require("../../../utils/types/enums/user-activity.enum");
const project_status_enum_1 = require("../../../utils/types/enums/project-status.enum");
const LOAD_RELATIONS = undefined;
let ProjectRepository = class ProjectRepository {
    projectRepository;
    projectUserRepository;
    userActivityRepository;
    masterDataSource;
    constructor(projectRepository, projectUserRepository, userActivityRepository, masterDataSource) {
        this.projectRepository = projectRepository;
        this.projectUserRepository = projectUserRepository;
        this.userActivityRepository = userActivityRepository;
        this.masterDataSource = masterDataSource;
    }
    async getProjectOrThrow(ProjectGetDBRequest) {
        const projectEntity = await this.projectRepository.findOne({ where: { ...ProjectGetDBRequest }, relations: LOAD_RELATIONS });
        if (!projectEntity) {
            throw new common_1.NotFoundException("Project not found", `Project '${ProjectGetDBRequest.id}' does not exist`);
        }
        return projectEntity;
    }
    async getProjectList(filters) {
        const alias = "project";
        const { orderName, orderSortingDir } = this.setOrder(filters, alias);
        const { skip, take } = pagination_helper_1.PaginationHelper.calculateSkipAndTake(filters);
        const queryBuilder = this.projectRepository
            .createQueryBuilder(alias)
            .leftJoin("project_jt_user", "projectUser", '"projectUser"."projectId" = project.id')
            .orderBy(orderName, orderSortingDir)
            .skip(skip)
            .take(take);
        if (filters.ids)
            queryBuilder.andWhere({ id: (0, typeorm_2.In)(filters.ids) });
        if (filters.name)
            queryBuilder.andWhere(`${alias}.name ILIKE :name`, {
                name: `%${filters.name}%`
            });
        if (filters.statuses)
            queryBuilder.andWhere(this.getStatusesQuery(alias, filters.statuses));
        if (filters.userIds)
            queryBuilder.andWhere('"projectUser"."userId" IN (:...userIds)', { userIds: filters.userIds });
        const [data, count] = await queryBuilder.getManyAndCount();
        return {
            data,
            meta: pagination_helper_1.PaginationHelper.generatePaginationMetadata(filters.page, filters.limit, count, skip)
        };
    }
    async createProject(projectCreateDBRequest, dateStart) {
        return this.masterDataSource.manager.transaction(async (entityManager) => {
            const projectRepository = entityManager.getRepository(project_entity_1.ProjectEntity);
            const projectEntity = await projectRepository.save({
                ...projectCreateDBRequest,
                dateStart,
                createdByUserId: projectCreateDBRequest.createdByUserId,
                updatedByUserId: projectCreateDBRequest.createdByUserId
            });
            const { projectParticipantEntities, userActivityEntities } = await this.getProjectDetails(entityManager, projectEntity);
            return {
                projectEntity: await projectRepository.findOneOrFail({ where: { id: projectEntity.id }, relations: LOAD_RELATIONS }),
                projectParticipantEntities,
                userActivityEntities
            };
        });
    }
    async updateProject(projectPatchDBRequest) {
        return this.masterDataSource.manager.transaction(async (entityManager) => {
            const projectRepository = entityManager.getRepository(project_entity_1.ProjectEntity);
            await projectRepository.update(projectPatchDBRequest.id, {
                name: projectPatchDBRequest.name,
                type: projectPatchDBRequest.type,
                dateStart: projectPatchDBRequest.dateStart,
                dateEnd: projectPatchDBRequest.dateEnd,
                updatedByUserId: projectPatchDBRequest.updatedByUserId
            });
            const projectEntity = await projectRepository.findOneOrFail({ where: { id: projectPatchDBRequest.id }, relations: LOAD_RELATIONS });
            const { projectParticipantEntities, userActivityEntities } = await this.getProjectDetails(entityManager, projectEntity);
            return {
                projectEntity,
                projectParticipantEntities,
                userActivityEntities
            };
        });
    }
    async softDeleteProjects(projectDeleteDBRequest) {
        await this.projectRepository.update({ id: (0, typeorm_2.In)(projectDeleteDBRequest.ids) }, {
            deletedByUserId: projectDeleteDBRequest.deletedByUserId,
            deletedAt: new Date()
        });
    }
    async getProjectLeads(projectId) {
        const projectUserEntities = await this.projectUserRepository.find({
            where: { projectId, role: project_user_role_enum_1.ProjectUserRole.Lead },
            relations: { user: { projects: true } }
        });
        return projectUserEntities.map(projectUserEntity => projectUserEntity.user);
    }
    async getProjectParticipants(projectId) {
        const projectUserEntities = await this.projectUserRepository.find({
            where: { projectId },
            relations: { user: { projects: true } }
        });
        return projectUserEntities.map(projectWorkspaceUserEntity => projectWorkspaceUserEntity.user);
    }
    async calculateProjectTotalHours(projectId) {
        const result = await this.userActivityRepository
            .createQueryBuilder("userActivity")
            .select("SUM(userActivity.hours)", "total_hours")
            .andWhere("userActivity.projectId = :projectId", { projectId })
            .andWhere("userActivity.activityType = :activityType", { activityType: user_activity_enum_1.UserActivityType.Daily })
            .andWhere("userActivity.hours IS NOT NULL")
            .getRawOne();
        return result["total_hours"] ? parseInt(result["total_hours"]) : 0;
    }
    async getTotalProjects() {
        return this.projectRepository.count();
    }
    async getProjectDetails(entityManager, projectEntity) {
        const projectUserRepository = entityManager.getRepository(project_user_entity_1.ProjectUserEntity);
        const userActivityRepository = entityManager.getRepository(user_activity_entity_1.UserActivityEntity);
        const projectUserEntities = await projectUserRepository.find({
            where: { projectId: projectEntity.id },
            relations: { user: { projects: true } }
        });
        const userActivityEntities = await userActivityRepository.find({
            where: { projectId: projectEntity.id, activityType: user_activity_enum_1.UserActivityType.Daily }
        });
        return {
            projectParticipantEntities: projectUserEntities.map(projectUserEntity => projectUserEntity.user),
            userActivityEntities
        };
    }
    getStatusesQuery(alias, statuses) {
        const now = new Date();
        return new typeorm_2.Brackets(qb => {
            if (statuses.includes(project_status_enum_1.ProjectStatus.Active)) {
                qb.orWhere(`:now BETWEEN ${alias}.dateStart AND COALESCE(${alias}.dateEnd, :now)`, { now });
            }
            if (statuses.includes(project_status_enum_1.ProjectStatus.Inactive)) {
                qb.orWhere({ dateEnd: (0, typeorm_2.LessThan)(now) });
            }
            if (statuses.includes(project_status_enum_1.ProjectStatus.Future)) {
                qb.orWhere({ dateStart: (0, typeorm_2.MoreThan)(now) });
            }
        });
    }
    setOrder(filters, alias) {
        const orderSortingDir = filters.sortingDir === "asc" ? "ASC" : "DESC";
        switch (filters.sort) {
            case "name":
                return {
                    orderName: `${alias}.name`,
                    orderSortingDir
                };
            case "dateEnd":
                return {
                    orderName: `${alias}.dateEnd`,
                    orderSortingDir
                };
            case "dateStart":
                return {
                    orderName: `${alias}.dateStart`,
                    orderSortingDir
                };
            default:
                return {
                    orderName: `${alias}.id`,
                    orderSortingDir
                };
        }
    }
};
exports.ProjectRepository = ProjectRepository;
exports.ProjectRepository = ProjectRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.ProjectEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(project_user_entity_1.ProjectUserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_activity_entity_1.UserActivityEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        master_data_source_service_1.MasterDataSource])
], ProjectRepository);
//# sourceMappingURL=project.repository.js.map