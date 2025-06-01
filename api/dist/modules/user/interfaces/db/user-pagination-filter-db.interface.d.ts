import { PaginationPropsRequest } from "src/utils/types/dtos/request/pagination-props.request";
import { UserStatus } from "src/utils/types/enums/user-status.enum";
export declare const sortingFieldUserValidationArray: readonly ["id", "name", "status"];
export type ISortingFieldUser = (typeof sortingFieldUserValidationArray)[number];
export interface IUserPaginationFilterDBRequest extends PaginationPropsRequest {
    ids?: number[];
    statuses?: UserStatus[];
    fullName?: string;
    sort?: ISortingFieldUser;
    metadata?: boolean;
}
