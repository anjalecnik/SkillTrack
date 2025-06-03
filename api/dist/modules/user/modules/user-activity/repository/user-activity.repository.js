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
exports.UserActivityRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("../../../../../libs/db/entities/notification.entity");
const user_activity_request_entity_1 = require("../../../../../libs/db/entities/user-activity-request.entity");
const user_activity_entity_1 = require("../../../../../libs/db/entities/user-activity.entity");
const user_entity_1 = require("../../../../../libs/db/entities/user.entity");
const date_helper_1 = require("../../../../../utils/helpers/date.helper");
const pagination_helper_1 = require("../../../../../utils/helpers/pagination.helper");
const notficiation_enum_1 = require("../../../../../utils/types/enums/notficiation.enum");
const notification_status_enum_1 = require("../../../../../utils/types/enums/notification-status.enum");
const user_activity_status_enum_1 = require("../../../../../utils/types/enums/user-activity-status.enum");
const user_activity_enum_1 = require("../../../../../utils/types/enums/user-activity.enum");
let UserActivityRepository = class UserActivityRepository {
    userActivityRepository;
    userActivityRequestRepository;
    notificationRepository;
    userRepository;
    constructor(userActivityRepository, userActivityRequestRepository, notificationRepository, userRepository) {
        this.userActivityRepository = userActivityRepository;
        this.userActivityRequestRepository = userActivityRequestRepository;
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }
    async getPendingActivityRequests(checkDate) {
        const where = {
            status: user_activity_status_enum_1.UserActivityStatus.PendingApproval,
            createdAt: (0, typeorm_2.LessThanOrEqual)(checkDate)
        };
        return this.userActivityRequestRepository.find({ where, relations: { user: { manager: { manager: true } }, userActivities: true, project: true } });
    }
    async getDistinctPendingUnassignedActivities(checkDate) {
        return this.userActivityRepository
            .createQueryBuilder("userActivity")
            .distinctOn(["userActivity.userId"])
            .leftJoinAndSelect("userActivity.user", "user")
            .leftJoinAndSelect("user", "user")
            .leftJoinAndSelect("user.manager", "manager")
            .where({ activityType: user_activity_enum_1.UserActivityType.Unassigned, date: (0, typeorm_2.LessThanOrEqual)(checkDate) })
            .getMany();
    }
    async getUserActivityByIdOrThrow({ userId }, id) {
        return this.userActivityRepository.findOneOrFail({ where: { id, userId }, relations: { activityRequest: { project: true }, project: true } });
    }
    async getUserLastActivityDailyRequest({ userId }, date) {
        const result = await this.userActivityRequestRepository.findOne({
            where: { dateStart: (0, typeorm_2.LessThanOrEqual)(date), userId, activityType: user_activity_enum_1.UserActivityType.Daily },
            relations: { userActivities: { project: true }, user: { workPosition: true } },
            order: { dateStart: "DESC" }
        });
        return result ?? undefined;
    }
    async getUserActivityList(filters) {
        const where = {
            userId: filters.userId
        };
        if (filters.ids)
            where.id = (0, typeorm_2.In)(filters.ids);
        if (filters.types)
            where.activityType = (0, typeorm_2.In)(filters.types);
        if (filters.projectIds)
            where.projectId = (0, typeorm_2.In)(filters.projectIds);
        if (filters.reportedByUserIds)
            where.reportedByUserId = (0, typeorm_2.In)(filters.reportedByUserIds);
        const defaultStatuses = [user_activity_status_enum_1.UserActivityStatus.Approved, user_activity_status_enum_1.UserActivityStatus.PendingApproval];
        where.status = (0, typeorm_2.In)(filters.statuses || defaultStatuses);
        const whereRequestDateAnd = [];
        if (filters.fromDateStart) {
            whereRequestDateAnd.push((0, typeorm_2.MoreThanOrEqual)(filters.fromDateStart));
        }
        if (filters.toDateEnd) {
            whereRequestDateAnd.push((0, typeorm_2.LessThanOrEqual)(filters.toDateEnd));
        }
        where.date = whereRequestDateAnd.length > 0 ? (0, typeorm_2.And)(...whereRequestDateAnd) : undefined;
        const order = this.getActivityOrder(filters);
        return this.userActivityRepository.find({ where, relations: { activityRequest: { project: true }, project: true, workingHours: true }, order });
    }
    getActivityOrder(filters) {
        switch (filters.sort) {
            case "dateStart":
                return { date: { direction: filters.sortingDir } };
            default:
                return { createdAt: { direction: filters.sortingDir } };
        }
    }
    async getUserActivityRequestByIdOrThrow({ userId }, id) {
        return this.userActivityRequestRepository.findOneOrFail({
            where: { id, userId },
            relations: { userActivities: { project: true }, project: true, user: { workPosition: true } }
        });
    }
    async getUserActivityRequestList(filters) {
        const queryBuilder = this.userActivityRequestRepository
            .createQueryBuilder("userActivityRequest")
            .leftJoinAndSelect("userActivityRequest.user", "user")
            .leftJoinAndSelect("user.workPosition", "workPosition")
            .leftJoinAndSelect("userActivityRequest.project", "project")
            .leftJoinAndSelect("userActivityRequest.userActivities", "userActivities")
            .leftJoinAndSelect("userActivities.project", "relatedProject");
        if (filters.userIds)
            queryBuilder.andWhere({ workspaceUserId: (0, typeorm_2.In)(filters.userIds) });
        if (filters.ids)
            queryBuilder.andWhere({ id: (0, typeorm_2.In)(filters.ids) });
        if (filters.types)
            queryBuilder.andWhere({ activityType: (0, typeorm_2.In)(filters.types) });
        if (filters.projectIds)
            queryBuilder.andWhere({ projectId: (0, typeorm_2.In)(filters.projectIds) });
        if (filters.reportedByUserIds)
            queryBuilder.andWhere({ reportedByWorkspaceUserId: (0, typeorm_2.In)(filters.reportedByUserIds) });
        if (filters.statuses)
            queryBuilder.andWhere({ status: (0, typeorm_2.In)(filters.statuses) });
        if (filters.fromDateStart || filters.toDateEnd) {
            queryBuilder.andWhere(`(userActivityRequest.dateStart <= :toDateEnd AND :fromDateStart <= COALESCE(userActivityRequest.dateEnd, userActivityRequest.dateStart))`, {
                fromDateStart: filters.fromDateStart ? filters.fromDateStart : date_helper_1.DateHelper.getYearZero(),
                toDateEnd: filters.toDateEnd ? filters.toDateEnd : date_helper_1.DateHelper.getPlusInfinity()
            });
        }
        if (filters.fullName) {
            const query = filters.fullName
                .split(" ")
                .filter(name => name.length > 0)
                .join(" & ") + ":*";
            queryBuilder.andWhere(`to_tsvector('simple', "user"."name" || ' ' || "user"."surname") @@ to_tsquery('simple', :query)`, { query });
        }
        const order = this.getActivityRequestOrder(filters);
        for (const [column] of Object.entries(order)) {
            queryBuilder.addOrderBy(column, order[column]);
        }
        return queryBuilder.getMany();
    }
    async getUserActivityRequestListPagination(filters) {
        const queryBuilder = this.userActivityRequestRepository
            .createQueryBuilder("userActivityRequest")
            .leftJoinAndSelect("userActivityRequest.user", "user")
            .leftJoinAndSelect("user.workPosition", "workPosition")
            .leftJoinAndSelect("userActivityRequest.project", "project")
            .leftJoinAndSelect("userActivityRequest.userActivities", "userActivities")
            .leftJoinAndSelect("userActivities.project", "relatedProject");
        if (filters.userIds)
            queryBuilder.andWhere({ userId: (0, typeorm_2.In)(filters.userIds) });
        if (filters.ids)
            queryBuilder.andWhere({ id: (0, typeorm_2.In)(filters.ids) });
        if (filters.types)
            queryBuilder.andWhere({ activityType: (0, typeorm_2.In)(filters.types) });
        if (filters.projectIds)
            queryBuilder.andWhere({ projectId: (0, typeorm_2.In)(filters.projectIds) });
        if (filters.reportedByUserIds)
            queryBuilder.andWhere({ reportedByUserId: (0, typeorm_2.In)(filters.reportedByUserIds) });
        if (filters.statuses)
            queryBuilder.andWhere({ status: (0, typeorm_2.In)(filters.statuses) });
        if (filters.fromDateStart || filters.toDateEnd) {
            queryBuilder.andWhere(`(userActivityRequest.dateStart <= :toDateEnd AND :fromDateStart <= COALESCE(userActivityRequest.dateEnd, userActivityRequest.dateStart))`, {
                fromDateStart: filters.fromDateStart ? filters.fromDateStart : date_helper_1.DateHelper.getYearZero(),
                toDateEnd: filters.toDateEnd ? filters.toDateEnd : date_helper_1.DateHelper.getPlusInfinity()
            });
        }
        if (filters.fullName && filters.fullName.trim().length > 0) {
            const query = filters.fullName
                .split(" ")
                .filter(name => name.length > 0)
                .join(" & ") + ":*";
            queryBuilder.andWhere(`to_tsvector('simple', "user"."name" || ' ' || "user"."surname") @@ to_tsquery('simple', :query)`, { query });
        }
        const order = this.getActivityRequestPaginationOrder(filters);
        for (const [column] of Object.entries(order)) {
            queryBuilder.addOrderBy(column, order[column]);
        }
        const { skip, take } = pagination_helper_1.PaginationHelper.calculateSkipAndTake(filters);
        const [data, count] = await queryBuilder.skip(skip).take(take).getManyAndCount();
        return {
            data,
            meta: pagination_helper_1.PaginationHelper.generatePaginationMetadata(filters.page, filters.limit, count)
        };
    }
    async getMonthlyUserProductivity() {
        const thisYear = new Date().getFullYear();
        const lastYear = thisYear - 1;
        const results = await this.userActivityRepository
            .createQueryBuilder("activity")
            .select(["EXTRACT(YEAR FROM activity.date) AS year", "EXTRACT(MONTH FROM activity.date) AS month", "SUM(activity.hours) AS total"])
            .where("activity.activityType IN (:...activityTypes)", { activityTypes: [user_activity_enum_1.UserActivityType.Daily, user_activity_enum_1.UserActivityType.BusinessTrip] })
            .andWhere("activity.status IN (:...statusFilter)", { statusFilter: [user_activity_status_enum_1.UserActivityStatus.Approved, user_activity_status_enum_1.UserActivityStatus.PendingApproval] })
            .andWhere("EXTRACT(YEAR FROM activity.date) IN (:...years)", { years: [thisYear, lastYear] })
            .andWhere("activity.hours IS NOT NULL")
            .groupBy("year, month")
            .orderBy("year, month")
            .getRawMany();
        const thisYearHours = Array(12).fill(0);
        const lastYearHours = Array(12).fill(0);
        for (const row of results) {
            const year = Number(row.year);
            const month = Number(row.month);
            const hours = Number(row.total);
            if (year === thisYear) {
                thisYearHours[month - 1] = hours;
            }
            else if (year === lastYear) {
                lastYearHours[month - 1] = hours;
            }
        }
        return {
            thisYear: thisYearHours,
            lastYear: lastYearHours
        };
    }
    getActivityRequestOrder(filters) {
        const sortingDir = filters.sortingDir.toUpperCase();
        switch (filters.sort) {
            case "id":
                return { "userActivityRequest.id": sortingDir };
            case "dateStart":
                return { "userActivityRequest.dateStart": sortingDir };
            case "dateEnd":
                return { "userActivityRequest.dateEnd": sortingDir };
            case "name":
                return { "user.name": sortingDir };
            default:
                return { "userActivityRequest.createdAt": sortingDir };
        }
    }
    async getAllUsers() {
        return this.userRepository.find();
    }
    async getManagerOfManagerSentNotifications(activityRequestIds) {
        return this.notificationRepository.find({
            where: {
                userActivityRequestId: (0, typeorm_2.In)(activityRequestIds),
                type: notficiation_enum_1.NotificationType.ActivityRequest,
                status: notification_status_enum_1.NotificationStatus.Finished
            }
        });
    }
    getActivityRequestPaginationOrder(filters) {
        const sortingDir = filters.sortingDir.toUpperCase();
        switch (filters.sort) {
            case "id":
                return { "userActivityRequest.id": sortingDir };
            case "dateStart":
                return { "userActivityRequest.dateStart": sortingDir };
            case "activityType":
                return { "userActivityRequest.activityType": sortingDir };
            case "name":
                return { "user.name": sortingDir };
            default:
                return { "userActivityRequest.createdAt": sortingDir };
        }
    }
};
exports.UserActivityRepository = UserActivityRepository;
exports.UserActivityRepository = UserActivityRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_activity_entity_1.UserActivityEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_activity_request_entity_1.UserActivityRequestEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(notification_entity_1.NotificationEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserActivityRepository);
//# sourceMappingURL=user-activity.repository.js.map