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
exports.TeamRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const team_entity_1 = require("../../../libs/db/entities/team.entity");
const typeorm_2 = require("typeorm");
const pagination_helper_1 = require("../../../utils/helpers/pagination.helper");
const LOAD_RELATIONS = undefined;
let TeamRepository = class TeamRepository {
    teamRepository;
    dataSource;
    constructor(teamRepository, dataSource) {
        this.teamRepository = teamRepository;
        this.dataSource = dataSource;
    }
    async save(teamEntity) {
        return this.dataSource.transaction(async (manager) => {
            const { id } = await manager.getRepository(team_entity_1.TeamEntity).save(teamEntity);
            return manager.getRepository(team_entity_1.TeamEntity).findOneOrFail({ where: { id } });
        });
    }
    async update(teamId, teamEntity) {
        await this.teamRepository.findOneOrFail({ where: { id: teamId } });
        return this.dataSource.transaction(async (manager) => {
            await manager.getRepository(team_entity_1.TeamEntity).save({
                ...teamEntity,
                id: teamId
            });
            return manager.getRepository(team_entity_1.TeamEntity).findOneOrFail({ where: { id: teamId }, relations: LOAD_RELATIONS });
        });
    }
    async getTeams(filters) {
        const skip = (filters.page - 1) * filters.limit;
        const query = this.teamRepository.createQueryBuilder("team");
        if (filters.name) {
            query.andWhere("team.name LIKE :name", { name: `%${filters.name}%` });
        }
        if (filters.sort === "createDate") {
            query.orderBy("team.createDate", this.getSortDir(filters.sortingDir));
        }
        else if (filters.sort) {
            query.orderBy(`team.${filters.sort}`, this.getSortDir(filters.sortingDir));
        }
        const [Teams, count] = await query.skip(skip).take(filters.limit).getManyAndCount();
        return {
            data: Teams,
            meta: pagination_helper_1.PaginationHelper.generatePaginationMetadata(filters.page, filters.limit, count)
        };
    }
    async findOneOrFail(userId) {
        try {
            return await this.teamRepository.findOneOrFail({ where: { id: userId }, relations: LOAD_RELATIONS });
        }
        catch (e) {
            throw new common_1.NotFoundException("User not found", `User '${userId} does not exists, ${e}`);
        }
    }
    getSortDir(sortingDir) {
        return ["desc", "DESC"].includes(sortingDir) ? "DESC" : "ASC";
    }
};
exports.TeamRepository = TeamRepository;
exports.TeamRepository = TeamRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(team_entity_1.TeamEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], TeamRepository);
//# sourceMappingURL=team.repository.js.map