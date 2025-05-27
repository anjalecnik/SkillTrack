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
exports.UtilityRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const holiday_entity_1 = require("../../../libs/db/entities/holiday.entity");
const project_entity_1 = require("../../../libs/db/entities/project.entity");
const user_address_entity_1 = require("../../../libs/db/entities/user-address.entity");
const user_entity_1 = require("../../../libs/db/entities/user.entity");
const date_helper_1 = require("../../../utils/helpers/date.helper");
const typeorm_2 = require("typeorm");
let UtilityRepository = class UtilityRepository {
    userRepository;
    projectRepository;
    holidayRepository;
    addressRepository;
    constructor(userRepository, projectRepository, holidayRepository, addressRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.holidayRepository = holidayRepository;
        this.addressRepository = addressRepository;
    }
    async getUser(id) {
        return ((await this.userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.workPosition", "workPosition")
            .leftJoinAndSelect("user.projects", "projectUser")
            .leftJoinAndSelect("user.manager", "manager")
            .leftJoinAndSelect("projectUser.project", "project")
            .where("user.id = :id", { id })
            .getOne()) ?? undefined);
    }
    async getUserWithProjects(id) {
        return (await this.userRepository.findOne({ where: { id }, relations: { projects: true } })) ?? undefined;
    }
    async getProject(id) {
        return (await this.projectRepository.findOne({ where: { id } })) ?? undefined;
    }
    async getHolidaysOnDates(countryCode, dates) {
        const dateConditions = dates.map(date => {
            const dateStartOfDay = date_helper_1.DateHelper.getStartOfDay(date);
            const dateEndOfDay = date_helper_1.DateHelper.getEndOfDay(date);
            return (0, typeorm_2.And)((0, typeorm_2.MoreThanOrEqual)(dateStartOfDay), (0, typeorm_2.LessThanOrEqual)(dateEndOfDay));
        });
        const orWhereCondition = dateConditions.map((dateCondition) => ({ countryCode, date: dateCondition }));
        return this.holidayRepository.find({ where: orWhereCondition });
    }
    async getHolidaysInDateRange(countryCode, dateStart, dateEnd) {
        return this.holidayRepository.find({
            where: {
                countryCode: countryCode,
                date: (0, typeorm_2.Between)(dateStart, dateEnd)
            }
        });
    }
    async getSubordinates(filter) {
        return this.userRepository.find({ where: { managerId: filter.userId } });
    }
};
exports.UtilityRepository = UtilityRepository;
exports.UtilityRepository = UtilityRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.ProjectEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(holiday_entity_1.HolidayEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(user_address_entity_1.UserAddressEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UtilityRepository);
//# sourceMappingURL=utility.repository.js.map