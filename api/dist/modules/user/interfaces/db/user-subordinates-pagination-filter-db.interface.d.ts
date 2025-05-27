import { UserEntity } from "src/libs/db/entities/user.entity";
import { PaginationPropsRequest } from "src/utils/types/dtos";
import { UserStatus } from "src/utils/types/enums/user-status.enum";
export declare const sortingFieldUserValidationArray: readonly ["id", "name", "status"];
export type ISortingFieldUser = (typeof sortingFieldUserValidationArray)[number];
export interface IUserSubordinatesPaginationFilterDBRequest extends Required<Pick<UserEntity, "id">>, PaginationPropsRequest {
    ids?: number[];
    statuses?: UserStatus[];
    fullName?: string;
    sort?: ISortingFieldUser;
    metadata?: boolean;
}
