import { UserVirtualActivityType } from "src/utils/types/enums/user-virtual-activity.enum";
export interface IUserVirtualActivity {
    activityType: UserVirtualActivityType;
    holidayName?: string;
    date: Date;
}
