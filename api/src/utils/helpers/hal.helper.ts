import { HalLinkResponse, HalLinksPaginationResponse, PaginatedMetaResponse, PaginationPropsRequest } from "../types/dtos"
import { UrlHelper } from "./url.helper"

export abstract class HalHelper {
	static halPaginationLinks<PagProps extends PaginationPropsRequest, Pagination extends PaginatedMetaResponse>(
		url: string,
		filters: PagProps,
		pagination: Pagination
	): HalLinksPaginationResponse {
		return {
			self: HalHelper.halSelf(url, filters),
			next: HalHelper.halNext(url, filters, pagination),
			previous: HalHelper.halPrevious(url, filters, pagination),
			first: HalHelper.halFirst(url, filters),
			last: HalHelper.halLast(url, filters, pagination)
		}
	}

	static halSelf<SearchParams extends object>(baseUrl: string, filters?: SearchParams): HalLinkResponse {
		const url = UrlHelper.createUrlParams(baseUrl, filters)
		return { href: url }
	}

	static halNext<PagProps extends PaginationPropsRequest, Pagination extends PaginatedMetaResponse>(
		baseUrl: string,
		filters: PagProps,
		pagination: Pagination
	): HalLinkResponse | undefined {
		const filterNext = { ...filters, page: filters.page + 1 }
		const url = UrlHelper.createUrlParams(baseUrl, filterNext)
		return pagination.to >= pagination.total ? undefined : { href: url }
	}

	static halPrevious<PagProps extends PaginationPropsRequest, Pagination extends PaginatedMetaResponse>(
		baseUrl: string,
		filters: PagProps,
		pagination: Pagination
	): HalLinkResponse | undefined {
		const filterPrevious = { ...filters, page: filters.page - 1 }
		const url = UrlHelper.createUrlParams(baseUrl, filterPrevious)
		return pagination.page <= 1 ? undefined : { href: url }
	}

	static halFirst<PagProps extends PaginationPropsRequest>(baseUrl: string, filters: PagProps): HalLinkResponse {
		const filterFirst = { ...filters, page: 1 }
		const url = UrlHelper.createUrlParams(baseUrl, filterFirst)
		return { href: url }
	}

	static halLast<PagProps extends PaginationPropsRequest, Pagination extends PaginatedMetaResponse>(baseUrl: string, filters: PagProps, pagination: Pagination): HalLinkResponse {
		const limit = filters.limit > 0 ? filters.limit : 1
		const lastPage = Math.ceil(pagination.total / limit)
		const filterLast = { ...filters, page: lastPage }
		const url = UrlHelper.createUrlParams(baseUrl, filterLast)
		return { href: url }
	}
}
