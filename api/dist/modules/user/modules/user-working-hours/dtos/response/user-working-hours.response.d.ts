import { UserWorkingHoursType } from "src/utils/types/enums/user-working-hours.enum";
export declare class UserWorkingHoursResponse {
    type: UserWorkingHoursType;
    fromDateStart: Date;
    toDateEnd: Date | null;
    projectId: number;
}
