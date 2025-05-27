"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const common_1 = require("@nestjs/common");
const team_mapper_1 = require("../../team/mappers/team.mapper");
const date_helper_1 = require("../../../utils/helpers/date.helper");
const work_position_mapper_1 = require("../../work-position/mappers/work-position.mapper");
const user_address_mapper_1 = require("../modules/user-address/mappers/user-address.mapper");
const user_assigned_vacation_mapper_1 = require("../modules/user-assigned-vacation/mappers/user-assigned-vacation.mapper");
let UserMapper = class UserMapper {
    static mapUserPaginationList(users, meta) {
        return {
            meta,
            data: users.map(user => this.mapUserListItem(user))
        };
    }
    static mapUserListItem(userDetails) {
        const vacation = this.mapUserActivityStatisticsVacationDetails(userDetails);
        return {
            id: userDetails.id,
            email: userDetails.email,
            status: userDetails.status,
            role: userDetails.role,
            name: userDetails.name,
            surname: userDetails.surname,
            team: userDetails.team ? team_mapper_1.TeamMapper.mapTeamListItem(userDetails.team) : undefined,
            workPosition: userDetails.workPosition ? work_position_mapper_1.WorkPositionMapper.mapWorkPositionListItem(userDetails.workPosition) : undefined,
            vacation: vacation
        };
    }
    static mapUserDetails({ userEntity, ...statistic }) {
        return {
            ...this.mapUserBase(userEntity),
            team: userEntity.team ? team_mapper_1.TeamMapper.mapTeamDetails(userEntity.team) : undefined,
            workPosition: userEntity.workPosition ? work_position_mapper_1.WorkPositionMapper.mapWorkPositionListItem(userEntity.workPosition) : undefined,
            manager: this.mapUserManagerShort(userEntity.manager),
            projects: userEntity.projects?.map(project => this.mapUserProjectsShort(project)),
            addresses: userEntity.addresses?.map(address => user_address_mapper_1.UserAddressMapper.mapUserAddressDetails(address)),
            activityStatistic: this.mapWorkspaceUserActivityStatisticsDetails(statistic),
            assignedVacations: userEntity.assignedVacations?.map(vacation => user_assigned_vacation_mapper_1.UserAssignedVacationMapper.mapUserAssignedVacationDetails(vacation)),
            isSupervisor: statistic.isSupervisor
        };
    }
    static mapUserBase(userEntity) {
        return {
            id: userEntity.id,
            email: userEntity.email,
            status: userEntity.status,
            role: userEntity.role,
            name: userEntity.name,
            surname: userEntity.surname,
            birthDate: userEntity.birthDate ? date_helper_1.DateHelper.formatIso8601DayString(userEntity.birthDate) : undefined,
            phone: userEntity.phone ?? undefined
        };
    }
    static mapUserInvitations(userEntities) {
        return {
            invitations: userEntities.map(userEntity => {
                return {
                    userId: userEntity.id
                };
            })
        };
    }
    static mapUserManagerShort(manager) {
        if (!manager) {
            return undefined;
        }
        return {
            id: manager.id,
            name: manager.name,
            surname: manager.surname,
            email: manager.email
        };
    }
    static mapWorkspaceUserActivityStatisticsDetails(statistic) {
        return {
            activeRequestCount: statistic.activityRequestCount,
            sickLeave: { countDays: statistic.sickLeave.countDays },
            vacation: this.mapUserActivityStatisticsVacationDetails(statistic)
        };
    }
    static mapUserActivityStatisticsVacationDetails(statistic) {
        if (!statistic.vacation) {
            return;
        }
        return {
            new: {
                usedDays: statistic.vacation.new.usedDays,
                assignedDays: statistic.vacation.new.assignedDays,
                availableDays: statistic.vacation.new.availableDays
            },
            old: {
                usedDays: statistic.vacation.old.usedDays,
                assignedDays: statistic.vacation.old.assignedDays,
                availableDays: statistic.vacation.old.availableDays
            },
            total: {
                usedDays: statistic.vacation.total.usedDays,
                assignedDays: statistic.vacation.total.assignedDays,
                availableDays: statistic.vacation.total.availableDays
            },
            upcoming: statistic.vacation.upcoming
        };
    }
    static mapUserProjectsShort(project) {
        return {
            id: project.projectId,
            name: project.project?.name ?? "",
            role: project.role,
            assignedPercentage: project.assignedPercentage,
            startDate: date_helper_1.DateHelper.formatIso8601DayString(project.project.dateStart),
            endDate: project.project.dateEnd ? date_helper_1.DateHelper.formatIso8601DayString(project.project.dateEnd) : undefined
        };
    }
};
exports.UserMapper = UserMapper;
exports.UserMapper = UserMapper = __decorate([
    (0, common_1.Injectable)()
], UserMapper);
//# sourceMappingURL=user.mapper.js.map