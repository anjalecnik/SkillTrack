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
exports.UserAssignedVacationRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_vacation_assigned_entity_1 = require("../../../../../libs/db/entities/user-vacation-assigned.entity");
const user_entity_1 = require("../../../../../libs/db/entities/user.entity");
const user_status_enum_1 = require("../../../../../utils/types/enums/user-status.enum");
const typeorm_2 = require("typeorm");
let UserAssignedVacationRepository = class UserAssignedVacationRepository {
    userVacationAssignedRepository;
    userRepository;
    constructor(userVacationAssignedRepository, userRepository) {
        this.userVacationAssignedRepository = userVacationAssignedRepository;
        this.userRepository = userRepository;
    }
    async getUserAssignedVacationAll(userId) {
        return this.userVacationAssignedRepository.find({ where: { userId } });
    }
    async createAssignedVacationForYear(userId, year) {
        return this.userVacationAssignedRepository.save({
            userId,
            year,
            createdByUserId: userId,
            updatedByUserId: userId
        });
    }
    async updateAssignedVacation(id, updateData) {
        const vacationEntry = await this.userVacationAssignedRepository.findOne({ where: { id } });
        if (!vacationEntry) {
            throw new Error("Vacation entry not found");
        }
        Object.assign(vacationEntry, updateData);
        return this.userVacationAssignedRepository.save(vacationEntry);
    }
    async getUsersActive() {
        return this.userRepository.find({ where: { status: user_status_enum_1.UserStatus.Active } });
    }
};
exports.UserAssignedVacationRepository = UserAssignedVacationRepository;
exports.UserAssignedVacationRepository = UserAssignedVacationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_vacation_assigned_entity_1.UserVacationAssignedEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserAssignedVacationRepository);
//# sourceMappingURL=user-assigned-vacation.repository.js.map