import { PaginatedMetaResponse } from "../dtos";
export interface IPaginatedResponse<T> {
    meta: PaginatedMetaResponse;
    data: T[];
}
