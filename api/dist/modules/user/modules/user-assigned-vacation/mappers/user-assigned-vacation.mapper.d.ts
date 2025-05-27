import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity";
import { UserAssignedVacationDetailsResponse } from "../dtos/response/user-assigned-vacation-details.response";
export declare abstract class UserAssignedVacationMapper {
    static mapUserAssignedVacationDetails(assignedVacation: UserVacationAssignedEntity): UserAssignedVacationDetailsResponse;
}
