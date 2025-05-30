import { TotalStatistics } from "./user-work-overview-total-statistics.response";
import { UserStatistics } from "./work-overview-user-statistics.response";
import { IUserWorkOverviewListHalResponse } from "../../interfaces/work-overview-list-hal-response.interface";
export declare class UserWorkOverviewListHalResponse implements IUserWorkOverviewListHalResponse {
    _links: {
        self: {
            href: string;
        };
    };
    users: UserStatistics[];
    total: TotalStatistics;
}
