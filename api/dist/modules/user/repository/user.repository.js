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
exports.UserRepository = void 0;
const user_entity_1 = require("../../../libs/db/entities/user.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const master_data_source_service_1 = require("../../../libs/db/master-data-source.service");
const pagination_helper_1 = require("../../../utils/helpers/pagination.helper");
const user_status_enum_1 = require("../../../utils/types/enums/user-status.enum");
const project_user_entity_1 = require("../../../libs/db/entities/project-user.entity");
const LOAD_RELATIONS = {
    team: true,
    workPosition: { parentWorkPosition: true },
    manager: true,
    notifications: true,
    projects: { project: true },
    addresses: true
};
let UserRepository = class UserRepository {
    userRepository;
    projectUserRepository;
    masterDataSource;
    constructor(userRepository, projectUserRepository, masterDataSource) {
        this.userRepository = userRepository;
        this.projectUserRepository = projectUserRepository;
        this.masterDataSource = masterDataSource;
    }
    async getAllWorkspaceUsers() {
        return await this.userRepository.find();
    }
    async getUserList(filters) {
        const alias = "user";
        const orderCriteria = this.setOrder(filters, alias);
        const { skip, take } = pagination_helper_1.PaginationHelper.calculateSkipAndTake(filters);
        const queryBuilder = this.userRepository
            .createQueryBuilder(alias)
            .leftJoinAndSelect(`${alias}.workPosition`, "workPosition")
            .leftJoinAndSelect(`${alias}.projects`, "projects")
            .leftJoinAndSelect(`${alias}.team`, "team")
            .skip(skip)
            .take(take);
        orderCriteria.forEach(({ orderName, orderSortingDir }) => {
            queryBuilder.addOrderBy(orderName, orderSortingDir);
        });
        if (filters.ids)
            queryBuilder.andWhere({ id: (0, typeorm_2.In)(filters.ids) });
        if (filters.statuses)
            queryBuilder.andWhere({ status: (0, typeorm_2.In)(filters.statuses) });
        if (filters.fullName) {
            queryBuilder.andWhere(`(${alias}.name || ' ' || ${alias}.surname) ILIKE :query`, { query: `%${filters.fullName.trim()}%` });
        }
        const [data, count] = await queryBuilder.getManyAndCount();
        return {
            data,
            meta: pagination_helper_1.PaginationHelper.generatePaginationMetadata(filters.page, filters.limit, count, skip)
        };
    }
    async invite(userInvitationRequest) {
        return this.masterDataSource.manager.transaction(async (entityManager) => {
            const userRepository = entityManager.getRepository(user_entity_1.UserEntity);
            return Promise.all(userInvitationRequest.invitations.map(async (invitation) => {
                const invitationObject = {
                    status: user_status_enum_1.UserStatus.Invited,
                    name: invitation.name,
                    surname: invitation.surname,
                    email: invitation.email,
                    invitedByUserId: userInvitationRequest.invitedByUserId
                };
                const userEntity = await userRepository.findOne({ where: { email: invitation.email } });
                if (!userEntity) {
                    return userRepository.save({ ...invitationObject, status: user_status_enum_1.UserStatus.Invited });
                }
                throw new common_1.BadRequestException(`User email already taken`, `User email already exists: $${invitation.email}`);
            }));
        });
    }
    async joinByInvitation(userId) {
        return this.masterDataSource.queryOnMaster(async (entityManager) => {
            const userRepository = entityManager.getRepository(user_entity_1.UserEntity);
            await userRepository.update(userId, { status: user_status_enum_1.UserStatus.Active });
            return userRepository.findOneOrFail({ where: { id: userId }, relations: LOAD_RELATIONS });
        });
    }
    async getUserByUserId(userId) {
        return this.userRepository.findOne({ where: { id: userId } });
    }
    async updateUser(userPatchRequest) {
        const addresses = this.setUserAddresses(userPatchRequest);
        const assignedVacations = this.setUserAssignedVacations(userPatchRequest);
        const { userProjectsToUpdate, userProjectsToAdd, userProjectsToStay } = await this.setUserProjects(userPatchRequest);
        return this.masterDataSource.manager.transaction(async (entityManager) => {
            const userRepository = entityManager.getRepository(user_entity_1.UserEntity);
            const projectUserRepository = entityManager.getRepository(project_user_entity_1.ProjectUserEntity);
            for (const projectToUpdate of userProjectsToUpdate) {
                await projectUserRepository.softDelete({ projectId: projectToUpdate.projectId, userId: projectToUpdate.userId });
            }
            const userEntity = await userRepository.preload({
                ...userPatchRequest,
                addresses: addresses,
                assignedVacations: assignedVacations,
                projects: userPatchRequest.projects ? [...userProjectsToAdd, ...userProjectsToStay] : undefined
            });
            if (!userEntity)
                throw new common_1.InternalServerErrorException("Something went wrong!");
            await userRepository.save(userEntity);
            return userRepository.findOneOrFail({ where: { id: userPatchRequest.id }, relations: LOAD_RELATIONS });
        });
    }
    async setUserActive(userId) {
        return this.masterDataSource.queryOnMaster(async (entityManager) => {
            const userRepository = entityManager.getRepository(user_entity_1.UserEntity);
            const user = await userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.BadRequestException(`User with ID ${userId} not found`);
            }
            user.status = user_status_enum_1.UserStatus.Active;
            await userRepository.save(user);
            return userRepository.findOneOrFail({ where: { id: userId }, relations: LOAD_RELATIONS });
        });
    }
    setUserAddresses(userPatchRequest) {
        if (!userPatchRequest.addresses)
            return undefined;
        return userPatchRequest.addresses.reduce((accumulator, address) => {
            accumulator.push(address.id
                ? address
                : {
                    ...address,
                    userId: userPatchRequest.id,
                    createdByUserId: userPatchRequest.updatedByUserId,
                    updatedByUserId: userPatchRequest.updatedByUserId
                });
            return accumulator;
        }, []);
    }
    setUserAssignedVacations(userPatchRequest) {
        if (!userPatchRequest.assignedVacations) {
            return undefined;
        }
        return userPatchRequest.assignedVacations.reduce((accumulator, assignedVacation) => {
            accumulator.push(assignedVacation.id
                ? assignedVacation
                : {
                    ...assignedVacation,
                    userId: userPatchRequest.id,
                    createdByUserId: userPatchRequest.updatedByUserId,
                    updatedByUserId: userPatchRequest.updatedByUserId
                });
            return accumulator;
        }, []);
    }
    async setUserProjects(userPatchRequest) {
        if (!userPatchRequest.projects) {
            return {
                userProjectsToUpdate: [],
                userProjectsToAdd: [],
                userProjectsToStay: []
            };
        }
        const userCurrentProjects = await this.projectUserRepository.find({ where: { userId: userPatchRequest.id } });
        const projectsToUpdate = userCurrentProjects.filter(currentProject => {
            const requestedProject = userPatchRequest.projects.find(project => project.id === currentProject.projectId);
            if (!requestedProject)
                return false;
            if (requestedProject.assignedPercentage !== currentProject.assignedPercentage || requestedProject.role !== currentProject.role)
                return true;
            return false;
        });
        const projectIdsToAdd = userPatchRequest.projects.map(project => project.id).filter(id => !userCurrentProjects.map(project => project.projectId).includes(id));
        const userProjectsToUpdate = this.setUserProjectsToUpdate(userPatchRequest, projectsToUpdate);
        const userProjectsToAdd = this.setUserProjectsToAdd(userPatchRequest, projectIdsToAdd);
        const userProjectsToStay = this.setUserProjectsToStay(userPatchRequest, userCurrentProjects, projectsToUpdate, userProjectsToAdd);
        return {
            userProjectsToUpdate,
            userProjectsToAdd,
            userProjectsToStay
        };
    }
    setOrder(filters, alias) {
        const orderSortingDir = filters.sortingDir === "asc" ? "ASC" : "DESC";
        switch (filters.sort) {
            case "name":
                return [
                    { orderName: `${alias}.name`, orderSortingDir },
                    { orderName: `${alias}.surname`, orderSortingDir }
                ];
            case "status":
                return [{ orderName: `${alias}.status`, orderSortingDir }];
            default:
                return [{ orderName: `${alias}.id`, orderSortingDir }];
        }
    }
    setUserProjectsToUpdate(userPatchRequest, projectsToUpdate) {
        return projectsToUpdate.map(projectToUpdate => {
            const requestedProject = userPatchRequest.projects.find(project => project.id === projectToUpdate.projectId);
            if (!requestedProject)
                throw new common_1.InternalServerErrorException("Failed to update project");
            return this.projectUserRepository.create({
                role: requestedProject.role,
                assignedPercentage: requestedProject.assignedPercentage,
                projectId: projectToUpdate.projectId,
                userId: projectToUpdate.userId
            });
        });
    }
    setUserProjectsToAdd(userPatchRequest, projectIdsToAdd) {
        return projectIdsToAdd.map(projectId => {
            const requestedProject = userPatchRequest.projects.find(project => project.id === projectId);
            if (!requestedProject)
                throw new common_1.InternalServerErrorException("Failed to add project");
            return this.projectUserRepository.create({
                role: requestedProject.role,
                assignedPercentage: requestedProject.assignedPercentage,
                projectId: projectId,
                userId: userPatchRequest.id
            });
        });
    }
    setUserProjectsToStay(userPatchRequest, userCurrentProjects, userProjectsToUpdate, userProjectsToAdd) {
        return userCurrentProjects.filter(currentProject => {
            const userProjectToUpdate = userProjectsToUpdate.find(projectToUpdate => projectToUpdate.projectId === currentProject.projectId && projectToUpdate.userId === currentProject.userId);
            const userProjectToAdd = userProjectsToAdd.find(projectToAdd => projectToAdd.projectId === currentProject.projectId && projectToAdd.userId === currentProject.userId);
            const shouldWorkspaceUserProjectBeRemoved = !userPatchRequest.projects.map(project => project.id).includes(currentProject.projectId);
            if (!userProjectToUpdate && !userProjectToAdd && !shouldWorkspaceUserProjectBeRemoved)
                return true;
            return false;
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(project_user_entity_1.ProjectUserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        master_data_source_service_1.MasterDataSource])
], UserRepository);
//# sourceMappingURL=user.repository.js.map