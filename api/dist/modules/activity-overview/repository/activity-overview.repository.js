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
exports.ActivityOverviewRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../../libs/db/entities/user.entity");
const pagination_helper_1 = require("../../../utils/helpers/pagination.helper");
let ActivityOverviewRepository = class ActivityOverviewRepository {
    userPerformanceReviewRepository;
    constructor(userPerformanceReviewRepository) {
        this.userPerformanceReviewRepository = userPerformanceReviewRepository;
    }
    async getPerformanceReviewListPagination(filters) {
        const alias = "user";
        const orderCriteria = this.setOrder(filters, alias);
        const queryBuilder = this.userPerformanceReviewRepository
            .createQueryBuilder(alias)
            .leftJoinAndSelect(`${alias}.performanceReviews`, "performanceReview")
            .leftJoinAndSelect("performanceReview.activities", "userActivity")
            .select([
            `${alias}.id`,
            `${alias}.name`,
            `${alias}.surname`,
            `${alias}.email`,
            "performanceReview.id",
            "performanceReview.quartal",
            "performanceReview.year",
            "performanceReview.answer1",
            "performanceReview.answer2",
            "performanceReview.answer3",
            "performanceReview.answer4",
            "performanceReview.score",
            "userActivity.activityRequestId"
        ]);
        orderCriteria.forEach(({ orderName, orderSortingDir }) => {
            queryBuilder.addOrderBy(orderName, orderSortingDir);
        });
        if (filters.userIds)
            queryBuilder.andWhere({ id: (0, typeorm_2.In)(filters.userIds) });
        if (filters.fullName) {
            const query = filters.fullName
                .split(" ")
                .filter(name => name.length > 0)
                .join(" & ") + ":*";
            queryBuilder.andWhere(`to_tsvector('simple', "user"."name" || ' ' || "user"."surname") @@ to_tsquery('simple', :query)`, { query });
        }
        const { skip, take } = pagination_helper_1.PaginationHelper.calculateSkipAndTake(filters);
        const [users, count] = await queryBuilder.skip(skip).take(take).getManyAndCount();
        const usersData = users.map(user => ({
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            scores: user.performanceReviews
                ?.filter(review => review.year === filters.year)
                .map(review => ({
                id: review.id,
                activityId: review.activities?.[0]?.activityRequestId || null,
                quartal: review.quartal,
                year: review.year,
                answer1: review.answer1,
                answer2: review.answer2,
                answer3: review.answer3,
                answer4: review.answer4,
                score: review.score
            })) || []
        }));
        return {
            data: usersData,
            meta: pagination_helper_1.PaginationHelper.generatePaginationMetadata(filters.page, filters.limit, count)
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
            default:
                return [{ orderName: `${alias}.id`, orderSortingDir }];
        }
    }
};
exports.ActivityOverviewRepository = ActivityOverviewRepository;
exports.ActivityOverviewRepository = ActivityOverviewRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ActivityOverviewRepository);
//# sourceMappingURL=activity-overview.repository.js.map