import { PaginatedMetaResponse, PaginationPropsRequest } from "../types/dtos";
export declare abstract class PaginationHelper {
    static calculateSkipAndTake({ page, limit }: PaginationPropsRequest): {
        skip: number;
        take: number;
    };
    static calculateLastPage({ page, limit }: PaginationPropsRequest): {
        skip: number;
        take: number;
    };
    static generatePaginationMetadata(page: number, limit: number, total: number, skip?: number): PaginatedMetaResponse;
    static mapPaginationMetaResponse(paginationMeta: PaginatedMetaResponse): PaginatedMetaResponse;
}
