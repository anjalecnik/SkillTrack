import { PaginatedMetaResponse, PaginationPropsRequest } from "../types/dtos"

export abstract class PaginationHelper {
	static calculateSkipAndTake({ page, limit }: PaginationPropsRequest): { skip: number; take: number } {
		return { skip: (page - 1) * limit, take: limit }
	}

	static calculateLastPage({ page, limit }: PaginationPropsRequest): { skip: number; take: number } {
		return { skip: (page - 1) * limit, take: limit }
	}

	static generatePaginationMetadata(page: number, limit: number, total: number, skip?: number): PaginatedMetaResponse {
		return {
			total,
			page,
			from: skip ?? (page - 1) * limit,
			to: Math.min(page * limit, total)
		}
	}

	static mapPaginationMetaResponse(paginationMeta: PaginatedMetaResponse): PaginatedMetaResponse {
		return {
			total: paginationMeta.total,
			page: paginationMeta.page,
			from: paginationMeta.from,
			to: paginationMeta.to
		}
	}
}
