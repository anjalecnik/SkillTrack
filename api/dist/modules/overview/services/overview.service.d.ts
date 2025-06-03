import { JiraService } from "src/modules/jira/services/jira.service";
import { ProjectRepository } from "src/modules/project/repository/project.repository";
import { UserRepository } from "src/modules/user/repository/user.repository";
import { OverviewResponse } from "../dtos/response/overview.response";
import { UserActivityRepository } from "src/modules/user/modules/user-activity/repository/user-activity.repository";
import { OverviewWorkingHoursResponse } from "../dtos/response/overview-working-hours.response";
export declare class OverviewService {
    private readonly userRepository;
    private readonly projectRepository;
    private readonly userActivityRepository;
    private readonly jiraService;
    constructor(userRepository: UserRepository, projectRepository: ProjectRepository, userActivityRepository: UserActivityRepository, jiraService: JiraService);
    getDashboardStatistics(): Promise<OverviewResponse>;
    getDashboardWorkingHoursStatistics(): Promise<OverviewWorkingHoursResponse>;
}
