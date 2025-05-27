import { HalResourceResponse, HalResourceStandardResponse } from "./hal.response";
export declare class UserEmbeddedWorkPositionItemsHalResponse extends HalResourceResponse {
    id: number;
    name: string;
}
export declare class UserEmbeddedItemsHalResponse extends HalResourceStandardResponse {
    workPosition?: UserEmbeddedWorkPositionItemsHalResponse;
}
export declare class UserShortHalResponse extends HalResourceResponse {
    id: number;
    name: string;
    surname: string;
    email?: string;
    _embedded?: UserEmbeddedItemsHalResponse;
}
