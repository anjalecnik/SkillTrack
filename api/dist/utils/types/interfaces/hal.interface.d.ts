export interface IHalLink {
    href: string;
    templated?: boolean;
    type?: string;
    deprecation?: string;
    name?: string;
    profile?: string;
    title?: string;
    hreflang?: string;
}
export interface IHalLinks {
    [key: string]: IHalLink | IHalLink[] | undefined;
    self: IHalLink;
    first?: IHalLink;
    last?: IHalLink;
    next?: IHalLink;
    previous?: IHalLink;
    find?: IHalLink;
}
export type IHalEmbeddedResource = {
    [key: string]: IHalResource | IHalResource[];
};
export interface IHalResource {
    _links?: IHalLinks;
    _embedded?: IHalEmbeddedResource;
    [key: string]: any;
}
