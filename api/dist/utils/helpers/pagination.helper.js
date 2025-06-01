"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationHelper = void 0;
class PaginationHelper {
    static calculateSkipAndTake({ page, limit }) {
        return { skip: (page - 1) * limit, take: limit };
    }
    static calculateLastPage({ page, limit }) {
        return { skip: (page - 1) * limit, take: limit };
    }
    static generatePaginationMetadata(page, limit, total, skip) {
        return {
            total,
            page,
            from: skip ?? (page - 1) * limit,
            to: Math.min(page * limit, total)
        };
    }
    static mapPaginationMetaResponse(paginationMeta) {
        return {
            total: paginationMeta.total,
            page: paginationMeta.page,
            from: paginationMeta.from,
            to: paginationMeta.to
        };
    }
}
exports.PaginationHelper = PaginationHelper;
//# sourceMappingURL=pagination.helper.js.map