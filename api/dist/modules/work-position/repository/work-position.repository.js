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
exports.WorkPositionRepository = exports.LOAD_RELATIONS = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const work_position_entity_1 = require("../../../libs/db/entities/work-position.entity");
const typeorm_2 = require("typeorm");
const pagination_helper_1 = require("../../../utils/helpers/pagination.helper");
exports.LOAD_RELATIONS = { parentWorkPosition: true };
let WorkPositionRepository = class WorkPositionRepository {
    workPositionRepository;
    constructor(workPositionRepository) {
        this.workPositionRepository = workPositionRepository;
    }
    async getWorkPositions(filters) {
        const alias = "workPosition";
        const { orderName, orderSortingDir } = this.setOrder(filters, alias);
        const { skip, take } = pagination_helper_1.PaginationHelper.calculateSkipAndTake(filters);
        const queryBuilder = this.workPositionRepository
            .createQueryBuilder(alias)
            .leftJoinAndSelect(`${alias}.parentWorkPosition`, "parentWorkPosition")
            .orderBy(orderName, orderSortingDir)
            .skip(skip)
            .take(take);
        if (filters.ids)
            queryBuilder.andWhere({ id: (0, typeorm_2.In)(filters.ids) });
        if (filters.name)
            queryBuilder.andWhere({ name: (0, typeorm_2.ILike)(`%${filters.name}%`) });
        if (filters.levels)
            queryBuilder.andWhere({ level: (0, typeorm_2.In)(filters.levels) });
        const [data, count] = await queryBuilder.getManyAndCount();
        return {
            data,
            meta: pagination_helper_1.PaginationHelper.generatePaginationMetadata(filters.page, filters.limit, count, skip)
        };
    }
    async getWorkPosition(id) {
        return this.workPositionRepository.findOne({ where: { id }, relations: exports.LOAD_RELATIONS });
    }
    async createWorkPosition(workPositionCreateDBRequest) {
        const { id } = await this.workPositionRepository.save({
            ...workPositionCreateDBRequest,
            updatedByUserId: workPositionCreateDBRequest.createdByUserId
        });
        return this.workPositionRepository.findOneOrFail({ where: { id }, relations: exports.LOAD_RELATIONS });
    }
    async patchWorkPosition(workPositionPatchDBRequest) {
        const updateResponse = await this.workPositionRepository.update(workPositionPatchDBRequest.id, {
            name: workPositionPatchDBRequest.name,
            level: workPositionPatchDBRequest.level,
            description: workPositionPatchDBRequest.description,
            workPositionPromotionId: workPositionPatchDBRequest.workPositionPromotionId,
            updatedByUserId: workPositionPatchDBRequest.updatedByUserId
        });
        if (updateResponse.affected !== 1)
            throw new common_1.UnprocessableEntityException("Failed to update Work Position");
        return this.workPositionRepository.findOneOrFail({ where: { id: workPositionPatchDBRequest.id }, relations: exports.LOAD_RELATIONS });
    }
    async deleteWorkPosition(id) {
        await this.workPositionRepository.delete({ id });
    }
    async getWorkPositionPromotions(workPositionId) {
        return this.workPositionRepository.find({ where: { workPositionPromotionId: workPositionId } });
    }
    async isWorkPositionAssignedToUser(id) {
        const workPositionEntity = await this.workPositionRepository.findOneOrFail({ where: { id }, relations: { user: true } });
        return workPositionEntity.user.length === 0 ? false : true;
    }
    setOrder(filters, alias) {
        const orderSortingDir = filters.sortingDir === "asc" ? "ASC" : "DESC";
        switch (filters.sort) {
            case "name":
                return {
                    orderName: `${alias}.name`,
                    orderSortingDir
                };
            case "level":
                return {
                    orderName: `${alias}.level`,
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
exports.WorkPositionRepository = WorkPositionRepository;
exports.WorkPositionRepository = WorkPositionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(work_position_entity_1.WorkPositionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WorkPositionRepository);
//# sourceMappingURL=work-position.repository.js.map