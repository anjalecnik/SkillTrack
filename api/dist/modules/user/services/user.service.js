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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repository/user.repository");
const utility_service_1 = require("../../utility/services/utility.service");
const user_role_enum_1 = require("../../../utils/types/enums/user-role.enum");
const user_address_service_1 = require("../modules/user-address/services/user-address.service");
const user_assigned_vacation_service_1 = require("../modules/user-assigned-vacation/services/user-assigned-vacation.service");
const date_helper_1 = require("../../../utils/helpers/date.helper");
const lodash_1 = __importDefault(require("lodash"));
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
    async getOverview(filter) {
        const data = await this.getOverviewRawData(filter);
        return data;
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
    async getWorkingDays(data, filter) {
        const { dateStart, dateEnd } = this.getDateRange(filter, data);
        let holidaysWithoutWeekends = (await this.utilityService.getHolidaysInDateRange(dateStart, dateEnd)).filter(holiday => !date_helper_1.DateHelper.isWeekend(holiday.date));
        holidaysWithoutWeekends = lodash_1.default.uniqBy(holidaysWithoutWeekends, holiday => date_helper_1.DateHelper.formatIso8601DayString(holiday.date));
        const weekendsCount = this.countWeekendsInDateRange(dateStart, dateEnd);
        const totalDays = date_helper_1.DateHelper.getDateDifferenceInDays(dateStart, dateEnd);
        const workingDaysCount = totalDays - weekendsCount - holidaysWithoutWeekends.length;
        return workingDaysCount;
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
    async getOverviewRawData(filter) {
        if (!filter.projectIds && !filter.userIds) {
            throw new common_1.BadRequestException("Missing filters!", `Request to get overview raw data is missing both 'projectIds' and 'userIds' filters. Filter details: ${JSON.stringify(filter)}.`);
        }
        let usersWithProjects = [];
        if (filter.projectIds && !filter.userIds) {
            usersWithProjects = await this.getProjectParticipants(filter.projectIds);
        }
        else if (filter.userIds) {
            usersWithProjects = await this.getUserProjects(filter.userIds, filter.projectIds);
        }
        filter = this.augmentFilter(filter, usersWithProjects);
        const activitiesWithoutProject = await this.userRepository.getActivitiesWithoutProject(filter);
        const activitiesWithProject = await this.userRepository.getActivitiesWithProject(filter);
        return { usersWithProjects, activitiesWithoutProject, activitiesWithProject };
    }
    async getProjectParticipants(projectIds) {
        const projectActivities = await this.userRepository.getActiveProjectParticipants(projectIds);
        const projectParticipantIds = lodash_1.default.uniqBy(projectActivities.map(activity => activity.user.id), id => id);
        if (!projectParticipantIds || projectParticipantIds.length === 0)
            throw new common_1.NotFoundException("No users found with this project.");
        const projectParticipants = await this.userRepository.getUsersWithProjects(projectParticipantIds, projectIds);
        const usersWithNoActivities = await this.getUsersWithNoActivities(projectParticipantIds, projectIds, true);
        if (usersWithNoActivities.length > 0) {
            return [
                ...usersWithNoActivities,
                ...projectParticipants.map(user => ({
                    user: user,
                    projects: lodash_1.default.uniqBy(user.userActivity.map(activity => activity.project), "id")
                }))
            ];
        }
        return projectParticipants.map(user => ({
            user: user,
            projects: lodash_1.default.uniqBy(user.userActivity.map(activity => activity.project), "id")
        }));
    }
    async getUsersWithNoActivities(projectParticipantIds, projectIds, onlyProjects) {
        let usersWithNoActivities = [];
        if (onlyProjects) {
            const assignedUsers = await this.userRepository.getAssiggnedProjectParticipants(projectIds);
            usersWithNoActivities = assignedUsers.filter(user => !projectParticipantIds.includes(user.id));
        }
        else {
            usersWithNoActivities = await Promise.all(projectParticipantIds.map(id => this.utilityService.getUserWithProjectsById(id)));
        }
        const usersWithProjects = [];
        for (const user of usersWithNoActivities) {
            const relevantProjectIds = user.projects?.map(project => project.projectId)?.filter(projectId => !projectIds || projectIds.includes(projectId));
            if (!relevantProjectIds || relevantProjectIds.length <= 0) {
                usersWithProjects.push({
                    user,
                    projects: []
                });
                continue;
            }
            const projects = await Promise.all(relevantProjectIds.map(id => this.utilityService.getProjectById(id)));
            usersWithProjects.push({
                user,
                projects: projects
            });
        }
        return usersWithProjects;
    }
    async getUserProjects(userIds, projectIds) {
        const usersWithProjects = await this.userRepository.getUsersWithProjects(userIds, projectIds);
        const gotUserIds = usersWithProjects.map(user => user.id);
        const missingUserIds = userIds.filter(user => !gotUserIds.includes(user));
        const usersWithNoActivities = await this.getUsersWithNoActivities(missingUserIds, projectIds, false);
        if (usersWithNoActivities.length > 0) {
            return [
                ...usersWithNoActivities,
                ...usersWithProjects.map(user => ({
                    user: user,
                    projects: lodash_1.default.uniqBy(user.userActivity.filter(activity => activity.project !== null).map(activity => activity.project), "id")
                }))
            ];
        }
        return usersWithProjects.map(user => ({
            user: user,
            projects: lodash_1.default.uniqBy(user.userActivity.filter(activity => activity.project !== null).map(activity => activity.project), "id")
        }));
    }
    augmentFilter(filter, allUsersWithProjects) {
        const existingProjectIds = filter.projectIds?.slice() ?? [];
        const existingUserIds = filter.userIds?.slice() ?? [];
        allUsersWithProjects.forEach(userWithProjects => {
            existingProjectIds.push(...(userWithProjects.projects?.map(project => project.id) ?? []));
            existingUserIds.push(userWithProjects.user.id);
        });
        const newFilter = {
            ...filter,
            projectIds: lodash_1.default.uniq(existingProjectIds),
            userIds: lodash_1.default.uniq(existingUserIds)
        };
        return newFilter;
    }
    getDateRange(filter, data) {
        if (filter.fromDateStart && filter.toDateEnd) {
            return this.validateDateRange(filter.fromDateStart, filter.toDateEnd);
        }
        if (filter.fromDateStart) {
            return { dateStart: filter.fromDateStart, dateEnd: new Date() };
        }
        const { minDate, maxDate } = this.getMinMaxDates(data);
        if (!minDate || !maxDate) {
            return { dateStart: new Date(), dateEnd: new Date() };
        }
        return this.validateDateRange(minDate, maxDate);
    }
    validateDateRange(dateStart, dateEnd) {
        const totalDaysCount = date_helper_1.DateHelper.getDateDifferenceInDays(dateStart, dateEnd);
        const maxDaysCount = (1 + 10) * 365;
        if (totalDaysCount > maxDaysCount) {
            const adjustedEndDate = date_helper_1.DateHelper.add(dateStart, 1, "years");
            const adjustedStartDate = date_helper_1.DateHelper.subtract(dateStart, 10, "years");
            return { dateStart: adjustedStartDate, dateEnd: adjustedEndDate };
        }
        return { dateStart, dateEnd };
    }
    getMinMaxDates(data) {
        const allActivities = [...data.activitiesWithoutProject, ...data.activitiesWithProject];
        const minActivity = lodash_1.default.minBy(allActivities, activity => activity.date);
        const maxActivity = lodash_1.default.maxBy(allActivities, activity => activity.date);
        const minDate = minActivity ? new Date(minActivity.date) : null;
        const maxDate = maxActivity ? new Date(maxActivity.date) : null;
        return {
            minDate,
            maxDate
        };
    }
    countWeekendsInDateRange(dateStart, dateEnd) {
        let weekends = 0;
        const dayDifference = date_helper_1.DateHelper.getDateDifferenceInDays(dateStart, dateEnd);
        const fullWeeks = Math.floor(dayDifference / 7);
        const extraDays = dayDifference % 7;
        weekends += fullWeeks * 2;
        let currentDate = date_helper_1.DateHelper.add(dateStart, fullWeeks * 7, "day");
        for (let i = 0; i < extraDays; i++) {
            if (date_helper_1.DateHelper.isWeekend(currentDate)) {
                weekends++;
            }
            currentDate = date_helper_1.DateHelper.add(currentDate, 1, "day");
        }
        return weekends;
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