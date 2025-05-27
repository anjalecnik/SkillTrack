import { IHalLink, IHalLinks } from "../../interfaces";
import { PaginatedMetaResponse } from "./paginated-meta.response";
export declare class HalLinkResponse implements IHalLink {
    href: string;
    templated?: boolean;
    type?: string;
    deprecation?: string;
    name?: string;
    profile?: string;
    title?: string;
    hreflang?: string;
}
export declare class HalLinksPaginationResponse implements IHalLinks {
    [key: string]: HalLinkResponse | HalLinkResponse[] | undefined;
    self: HalLinkResponse;
    first: HalLinkResponse;
    last: HalLinkResponse;
    next?: HalLinkResponse;
    previous?: HalLinkResponse;
    find?: HalLinkResponse;
}
export declare class HalLinksResponse implements IHalLinks {
    [key: string]: HalLinkResponse | HalLinkResponse[] | undefined;
    self: HalLinkResponse;
}
export declare class HalResourceStandardResponse {
    _links?: HalLinksResponse | HalLinksPaginationResponse;
    _embedded?: {
        [rel: string]: HalResourceStandardResponse | HalResourceStandardResponse[];
    };
    [key: string]: any;
}
export declare class HalResourcePaginationResponse extends PaginatedMetaResponse {
    _links: HalLinksPaginationResponse;
    _embedded?: {
        [rel: string]: HalResourceStandardResponse | HalResourceStandardResponse[];
    };
    [key: string]: any;
}
export declare class HalResourceResponse extends HalResourceStandardResponse {
    _links: HalLinksResponse | HalLinksPaginationResponse;
}
