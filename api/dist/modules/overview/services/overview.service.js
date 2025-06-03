"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverviewService = void 0;
const common_1 = require("@nestjs/common");
const jira_service_1 = require("../../jira/services/jira.service");
const project_repository_1 = require("../../project/repository/project.repository");
const user_repository_1 = require("../../user/repository/user.repository");
const user_activity_repository_1 = require("../../user/modules/user-activity/repository/user-activity.repository");
let OverviewService = class OverviewService {
    userRepository;
    projectRepository;
    userActivityRepository;
    jiraService;
    constructor(userRepository, projectRepository, userActivityRepository, jiraService) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.userActivityRepository = userActivityRepository;
        this.jiraService = jiraService;
    }
    async getDashboardStatistics() {
        const totalMembers = await this.userRepository.getTotalEmployees();
        const totalProjects = await this.projectRepository.getTotalProjects();
        const taskProgress = await this.jiraService.getTaskProgress();
        const cloudPosition = await this.userRepository.getTotalUsersWithPositon(1);
        const databasePosition = await this.userRepository.getTotalUsersWithPositon(8);
        const otherPositon = totalMembers - cloudPosition - databasePosition;
        return {
            members: totalMembers,
            projects: totalProjects,
            taskProgress,
            positionDistribution: {
                cloud: cloudPosition,
                database: databasePosition,
                other: otherPositon
            }
        };
    }
    async getDashboardWorkingHoursStatistics() {
        const monthlyUserProductivity = await this.userActivityRepository.getMonthlyUserProductivity();
        return { monthlyUserProductivity: monthlyUserProductivity };
    }
};
exports.OverviewService = OverviewService;
exports.OverviewService = OverviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        project_repository_1.ProjectRepository,
        user_activity_repository_1.UserActivityRepository,
        jira_service_1.JiraService])
], OverviewService);
//# sourceMappingURL=overview.service.js.map