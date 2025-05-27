import { PaginatedMetaResponse } from "src/utils/types/dtos";
import { UserListItemResponse } from "./user-list-item.response";
export declare class UserListResponse {
    meta: PaginatedMetaResponse;
    data: UserListItemResponse[];
}
