import { DateTimeWithoutTimezoneResponse } from "src/utils/types/dtos";
import { UserWorkingHoursType } from "src/utils/types/enums/user-working-hours.enum";
export declare class UserWorkingHoursListItemResponse {
    id: number;
    type: UserWorkingHoursType;
    fromDateStart: DateTimeWithoutTimezoneResponse;
    toDateEnd?: DateTimeWithoutTimezoneResponse;
    projectName: string | null;
    projectId: number | null;
}
