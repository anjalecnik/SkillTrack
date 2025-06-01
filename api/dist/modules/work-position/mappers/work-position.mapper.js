"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkPositionMapper = void 0;
class WorkPositionMapper {
    static mapWorkPositionPaginationList(workPositions, meta) {
        return {
            meta,
            data: workPositions.map(workPosition => this.mapWorkPositionListItem(workPosition))
        };
    }
    static mapWorkPositionListItem(workPositionEntity) {
        return {
            id: workPositionEntity.id,
            name: workPositionEntity.name,
            level: workPositionEntity.level,
            description: workPositionEntity.description,
            workPromotion: workPositionEntity.parentWorkPosition ? this.mapOneWorkPositionPromotion(workPositionEntity.parentWorkPosition) : undefined
        };
    }
    static mapOneWorkPositionPromotion(workPositionEntity) {
        return {
            id: workPositionEntity.id,
            name: workPositionEntity.name
        };
    }
}
exports.WorkPositionMapper = WorkPositionMapper;
//# sourceMappingURL=work-position.mapper.js.map