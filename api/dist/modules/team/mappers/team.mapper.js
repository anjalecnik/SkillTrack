"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMapper = void 0;
class TeamMapper {
    static mapTeamPaginationList(teamEntities, meta) {
        return {
            meta,
            data: teamEntities.map(team => this.mapTeamListItem(team))
        };
    }
    static mapTeamListItem(teamEntity) {
        return {
            id: teamEntity.id,
            name: teamEntity.name,
            description: teamEntity.description,
            createdBy: teamEntity.createdBy,
            modifiedBy: teamEntity.modifiedBy
        };
    }
    static mapTeamDetails(teamEntity) {
        return {
            id: teamEntity.id,
            name: teamEntity.name,
            description: teamEntity.description
        };
    }
}
exports.TeamMapper = TeamMapper;
//# sourceMappingURL=team.mapper.js.map