import { PaginationPropsRequest } from "src/utils/types/dtos";
import { UserStatus } from "src/utils/types/enums/user-status.enum";
import { ISortingFieldUser } from "../../interfaces";
export declare class UserPaginationFilterRequest extends PaginationPropsRequest {
    ids?: number[];
    statuses?: UserStatus[];
    fullName?: string;
    sort?: ISortingFieldUser;
    metadata?: boolean;
}
