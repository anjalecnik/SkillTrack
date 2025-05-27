import { UserEntity } from "src/libs/db/entities/user.entity";
import { IUserDetailsVacationResponse } from "./user-details-vacation-response.interface";
export interface IUserDetailsResponse {
    userEntity: UserEntity;
    vacation?: IUserDetailsVacationResponse;
    sickLeave: {
        countDays: number;
    };
    activityRequestCount: number;
    isSupervisor?: boolean;
}
