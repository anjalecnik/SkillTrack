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
exports.UtilityService = void 0;
const common_1 = require("@nestjs/common");
const utility_repository_1 = require("../repository/utility.repository");
const work_day_helper_1 = require("../../../utils/helpers/work-day.helper");
const SLOVENIA_WORKING_DAYS = [1, 2, 3, 4, 5];
let UtilityService = class UtilityService {
    utilityRepository;
    constructor(utilityRepository) {
        this.utilityRepository = utilityRepository;
    }
    async getUserById(userId) {
        const userEntity = await this.utilityRepository.getUser(userId);
        if (!userEntity)
            throw new common_1.NotFoundException(`User not found`, `User'${userEntity}' does not exist`);
        return userEntity;
    }
    async getUserWithProjectsById(userId) {
        const userEntity = await this.utilityRepository.getUserWithProjects(userId);
        if (!userEntity)
            throw new common_1.NotFoundException(`User not found`, `User'${userEntity}' does not exist`);
        return userEntity;
    }
    async getProjectById(projectId) {
        const projectEntity = await this.utilityRepository.getProject(projectId);
        if (!projectEntity)
            throw new common_1.NotFoundException(`Project not found`, `Project'${projectEntity}' does not exist`);
        return projectEntity;
    }
    async getHolidaysOnDateRangeByCountryCode(countryCode, dates) {
        return this.utilityRepository.getHolidaysOnDates(countryCode, dates);
    }
    async getHolidaysInDateRange(dateStart, dateEnd) {
        return this.utilityRepository.getHolidaysInDateRange(dateStart, dateEnd);
    }
    async getWorkDaysArray() {
        const workingDays = [1, 2, 3, 4, 5];
        return Promise.resolve(workingDays);
    }
    async getWorkingDays(dates) {
        const holidays = await this.getHolidaysOnDateRangeByCountryCode("SI", dates);
        const workingDays = SLOVENIA_WORKING_DAYS;
        return work_day_helper_1.WorkDayHelper.getWorkingDays(dates, { holidays, workingDays });
    }
    async isUserSelfSuperior(userId) {
        const userEntity = await this.getUserById(userId);
        if (userEntity.managerId === null || userEntity.managerId === userEntity.id)
            return true;
        return false;
    }
    async getSubordinateIdsRecursively(userId, visitedIds = new Set(), maxLevel = 100, currentLevel = 0) {
        if (currentLevel >= maxLevel || visitedIds.has(userId)) {
            return [];
        }
        visitedIds.add(userId);
        const directSubordinateIds = (await this.utilityRepository.getSubordinates({ userId })).map(user => user.id);
        const nestedResults = await Promise.all(directSubordinateIds.map(id => this.getSubordinateIdsRecursively(id, visitedIds, maxLevel, currentLevel + 1)));
        const allSubordinates = new Set([...directSubordinateIds, ...nestedResults.flat()]);
        return Array.from(allSubordinates);
    }
    async isUserSupervisorToEmployee(supervisorId, employeeId) {
        const subordinateIds = await this.getSubordinateIdsRecursively(supervisorId, new Set());
        return subordinateIds.includes(employeeId);
    }
};
exports.UtilityService = UtilityService;
exports.UtilityService = UtilityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [utility_repository_1.UtilityRepository])
], UtilityService);
//# sourceMappingURL=utility.service.js.map