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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repository/user.repository");
const utility_service_1 = require("../../utility/services/utility.service");
const user_role_enum_1 = require("../../../utils/types/enums/user-role.enum");
const user_address_service_1 = require("../modules/user-address/services/user-address.service");
const user_assigned_vacation_service_1 = require("../modules/user-assigned-vacation/services/user-assigned-vacation.service");
let UserService = class UserService {
    userRepository;
    userAddressService;
    userAssignedVacationService;
    utilityService;
    constructor(userRepository, userAddressService, userAssignedVacationService, utilityService) {
        this.userRepository = userRepository;
        this.userAddressService = userAddressService;
        this.userAssignedVacationService = userAssignedVacationService;
        this.utilityService = utilityService;
    }
    async getUser(userReadRequest) {
        const userEntity = await this.utilityService.getUserById(userReadRequest.id);
        const subordinateWorkspaceUserIds = await this.utilityService.getSubordinateIdsRecursively(userReadRequest.id, new Set());
        return {
            userEntity,
            vacation: undefined,
            sickLeave: { countDays: 0 },
            activityRequestCount: 0,
            isSupervisor: subordinateWorkspaceUserIds.length > 0
        };
    }
    async getUserList(filters) {
        if (filters.fullName && filters.fullName.split(" ").filter(name => name.length > 0).length > 3)
            throw new common_1.BadRequestException("Name can't contain more than 3 words", `Name can't contain more than 3 words. Requested name: ${filters.fullName}`);
        const pagination = await this.userRepository.getUserList(filters);
        const data = filters.metadata ? await this.enrichUserData(pagination.data) : pagination.data;
        return { meta: pagination.meta, data: data };
    }
    async getSubordinatesList(filters) {
        if (filters.fullName && filters.fullName.split(" ").filter(name => name.length > 0).length > 3)
            throw new common_1.BadRequestException("Name can't contain more than 3 words", `Name can't contain more than 3 words. Requested name: ${filters.fullName}`);
        const userSubordinates = await this.utilityService.getSubordinateIdsRecursively(filters.id, new Set());
        const pagination = await this.userRepository.getUserList({
            ...filters,
            ids: [...(filters.ids ?? []), ...userSubordinates]
        });
        const data = filters.metadata ? await this.enrichUserData(pagination.data) : pagination.data;
        return { meta: pagination.meta, data: data };
    }
    async enrichUserData(data) {
        return await Promise.all(data.map((user) => {
            return {
                ...user,
                vacation: undefined
            };
        }));
    }
    async invite(userInvitationRequest) {
        const userEntities = await this.userRepository.invite(userInvitationRequest);
        return userEntities;
    }
    async updateUser(userPatch) {
        await this.validateUserAddresses(userPatch);
        await this.validateUserAssignedVacation(userPatch);
        await this.validateCircularManagerRelationship(userPatch);
        if (userPatch.projects && userPatch.projects?.length > 0) {
            this.validateUserProjects(userPatch);
            userPatch = this.generateAssignedPercentage(userPatch);
        }
        const userEntity = await this.userRepository.updateUser(userPatch);
        return this.getUser(userEntity);
    }
    async setUserActive(userId) {
        await this.userRepository.setUserActive(userId);
    }
    async validateGetUser(userReadRequest) {
        const invokerUserId = userReadRequest?.authPassport?.user.id ?? 0;
        const isSupervisor = await this.utilityService.isUserSupervisorToEmployee(invokerUserId, userReadRequest.id);
        if (userReadRequest.authPassport?.user.role === user_role_enum_1.UserRole.User && invokerUserId !== userReadRequest.id && !isSupervisor) {
            throw new common_1.ForbiddenException("You do not have permission to view this user.", `User with ID: '${invokerUserId}' and role ${userReadRequest.authPassport.user.role} attempted to access user with ID: '${userReadRequest.id}'`);
        }
        return isSupervisor;
    }
    async validateUserAddresses({ id, addresses }) {
        if (!addresses) {
            return;
        }
        await this.userAddressService.validateAddressRequest(id, addresses);
    }
    async validateUserAssignedVacation({ id, assignedVacations }) {
        if (!assignedVacations) {
            return;
        }
        await this.userAssignedVacationService.validateAssignedVacationRequest(id, assignedVacations);
    }
    validateUserProjects(userPatch) {
        if (!userPatch.projects || userPatch.projects.length === 0)
            return;
        const projectIds = userPatch.projects.map(project => project.id);
        const duplicates = projectIds.filter((id, index) => projectIds.indexOf(id) !== index);
        if (duplicates.length !== 0)
            throw new common_1.BadRequestException("Some project are assigned multiple times", `Workspace user with ID: '${userPatch.id}' assigned theese projects multiple times: ${duplicates.join(", ")}`);
    }
    async validateCircularManagerRelationship(userPatch) {
        if (!userPatch.managerId || userPatch.managerId === userPatch.id)
            return;
        const userSubordinates = await this.utilityService.getSubordinateIdsRecursively(userPatch.id, new Set());
        if (userSubordinates.includes(userPatch.managerId)) {
            throw new common_1.BadRequestException("Circular manager relationship detected");
        }
    }
    generateAssignedPercentage(userPatch) {
        const { projects } = userPatch;
        if (!projects || projects.length <= 0) {
            return { ...userPatch, projects: [] };
        }
        const projectCount = projects.length;
        const basePercentage = Math.floor(100 / projectCount);
        const remainingPercentage = 100 - basePercentage * projectCount;
        const updatedProjects = projects.map((project, index) => ({
            ...project,
            assignedPercentage: basePercentage + (index < remainingPercentage ? 1 : 0)
        }));
        return { ...userPatch, projects: updatedProjects };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        user_address_service_1.UserAddressService,
        user_assigned_vacation_service_1.UserAssignedVacationService,
        utility_service_1.UtilityService])
], UserService);
//# sourceMappingURL=user.service.js.map