import { UserEntity } from "src/libs/db/entities/user.entity";
import { IUserDetailsVacationResponse } from "./user-details-vacation-response.interface";
export interface IUserPaginationItemResponse extends UserEntity {
    vacation?: IUserDetailsVacationResponse;
}
