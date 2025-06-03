import { OverviewResponse } from "../dtos/response/overview.response";
import { OverviewService } from "../services/overview.service";
import { OverviewWorkingHoursResponse } from "../dtos/response/overview-working-hours.response";
export declare class OverviewAdminHubController {
    private readonly overviewService;
    constructor(overviewService: OverviewService);
    getDashboardStatistics(): Promise<OverviewResponse>;
    getDashboardWorkingHoursStatistics(): Promise<OverviewWorkingHoursResponse>;
}
