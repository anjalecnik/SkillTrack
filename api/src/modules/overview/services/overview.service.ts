import { Injectable } from "@nestjs/common"
import { JiraService } from "src/modules/jira/services/jira.service"
import { ProjectRepository } from "src/modules/project/repository/project.repository"
import { UserRepository } from "src/modules/user/repository/user.repository"
import { OverviewResponse } from "../dtos/response/overview.response"
import { UserActivityRepository } from "src/modules/user/modules/user-activity/repository/user-activity.repository"
import { OverviewWorkingHoursResponse } from "../dtos/response/overview-working-hours.response"

@Injectable()
export class OverviewService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly projectRepository: ProjectRepository,
		private readonly userActivityRepository: UserActivityRepository,
		private readonly jiraService: JiraService
	) {}

	async getDashboardStatistics(): Promise<OverviewResponse> {
		const totalMembers = await this.userRepository.getTotalEmployees()
		const totalProjects = await this.projectRepository.getTotalProjects()
		const taskProgress = await this.jiraService.getTaskProgress()

		const cloudPosition = await this.userRepository.getTotalUsersWithPositon(1) // Temporary
		const databasePosition = await this.userRepository.getTotalUsersWithPositon(8) // Temporary
		const otherPositon = totalMembers - cloudPosition - databasePosition

		return {
			members: totalMembers,
			projects: totalProjects,
			taskProgress,
			positionDistribution: {
				cloud: cloudPosition,
				database: databasePosition,
				other: otherPositon
			}
		}
	}

	async getDashboardWorkingHoursStatistics(): Promise<OverviewWorkingHoursResponse> {
		const monthlyUserProductivity = await this.userActivityRepository.getMonthlyUserProductivity()
		return { monthlyUserProductivity: monthlyUserProductivity }
	}
}
