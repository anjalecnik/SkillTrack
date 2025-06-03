import { OverviewPositionDistributionResponse } from "./overview-position-distribution.response";
export declare class OverviewResponse {
    members: number;
    projects: number;
    taskProgress: number;
    positionDistribution?: OverviewPositionDistributionResponse;
}
