import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity";
export interface IVacationCalculation {
    vacationContract: UserVacationAssignedEntity;
    upcomingVacationDays: number;
}
