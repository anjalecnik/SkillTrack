import { HalLinkResponse, HalLinksPaginationResponse, PaginatedMetaResponse, PaginationPropsRequest } from "../types/dtos";
export declare abstract class HalHelper {
    static halPaginationLinks<PagProps extends PaginationPropsRequest, Pagination extends PaginatedMetaResponse>(url: string, filters: PagProps, pagination: Pagination): HalLinksPaginationResponse;
    static halSelf<SearchParams extends object>(baseUrl: string, filters?: SearchParams): HalLinkResponse;
    static halNext<PagProps extends PaginationPropsRequest, Pagination extends PaginatedMetaResponse>(baseUrl: string, filters: PagProps, pagination: Pagination): HalLinkResponse | undefined;
    static halPrevious<PagProps extends PaginationPropsRequest, Pagination extends PaginatedMetaResponse>(baseUrl: string, filters: PagProps, pagination: Pagination): HalLinkResponse | undefined;
    static halFirst<PagProps extends PaginationPropsRequest>(baseUrl: string, filters: PagProps): HalLinkResponse;
    static halLast<PagProps extends PaginationPropsRequest, Pagination extends PaginatedMetaResponse>(baseUrl: string, filters: PagProps, pagination: Pagination): HalLinkResponse;
}
