import { Injectable, NotFoundException } from "@nestjs/common"
import { DateHelper } from "src/utils/helpers/date.helper"
import { IPaginatedResponse } from "src/utils/types/interfaces"
import {
	IProjectGetRequest,
	IProjectDetailsResponse,
	IProjectCreateRequest,
	IProjectOverviewPaginationFilterRequest,
	IProjectOverviewPaginationItemResponse,
	IProjectDeleteRequest,
	IProjectOverviewResponse,
	IProjectDetailsDBResponse,
	IProjectPatchRequest
} from "../interfaces"
import { ProjectRepository } from "../repository/project.repository"
import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { ProjectStatus } from "src/utils/types/enums/project-status.enum"
import { IAuthJwtPassportUserDataRequest } from "src/modules/auth/interfaces"

@Injectable()
export class ProjectService {
	constructor(private readonly projectRepository: ProjectRepository) {}

	async getProject(projectGetRequest: IProjectGetRequest): Promise<IProjectDetailsResponse> {
		const projectEntity = await this.projectRepository.getProjectOrThrow(projectGetRequest)

		return this.getProjectDetails(projectEntity)
	}

	async getProjectList(filters: IProjectOverviewPaginationFilterRequest): Promise<IPaginatedResponse<IProjectOverviewPaginationItemResponse>> {
		const pagination = await this.projectRepository.getProjectList(filters)

		const data = filters.metadata ? await this.enrichProjectData(pagination) : pagination.data

		return { meta: pagination.meta, data }
	}

	async createProject(projectCreateRequest: IProjectCreateRequest): Promise<IProjectDetailsResponse> {
		const timezone = "Europe/Ljubljana"
		const dateStart = DateHelper.subtractWorkspaceOffset(timezone, DateHelper.getStartOfDay(new Date()))
		const projectDetailsDBResponse = await this.projectRepository.createProject(projectCreateRequest, dateStart)

		return this.getProjectDBDetails(projectDetailsDBResponse)
	}

	async updateProject(projectPatchRequest: IProjectPatchRequest): Promise<IProjectDetailsResponse> {
		const dateStart = projectPatchRequest.dateStart ? DateHelper.getStartOfDay(projectPatchRequest.dateStart) : undefined
		const dateEnd = projectPatchRequest.dateEnd ? DateHelper.getEndOfDay(projectPatchRequest.dateEnd) : projectPatchRequest.dateEnd

		const projectDetailsDBResponse = await this.projectRepository.updateProject({ ...projectPatchRequest, dateStart, dateEnd })

		return this.getProjectDBDetails(projectDetailsDBResponse)
	}

	async deleteProjects(projectDeleteRequest: IProjectDeleteRequest): Promise<void> {
		await this.projectRepository.softDeleteProjects(projectDeleteRequest)
	}

	private async enrichProjectData(pagination: IPaginatedResponse<ProjectEntity>): Promise<IProjectOverviewPaginationItemResponse[]> {
		return Promise.all(
			pagination.data.map(async (project): Promise<IProjectOverviewPaginationItemResponse> => {
				const projectOverview = await this.getProjectOverview(project)

				return {
					...project,
					participants: projectOverview.projectParticipantEntities,
					status: projectOverview.status,
					totalHours: projectOverview.totalHours
				}
			})
		)
	}

	private async getProjectOverview(projectEntity: ProjectEntity): Promise<IProjectOverviewResponse> {
		const [projectParticipantEntities, totalHours] = await Promise.all([
			this.projectRepository.getProjectParticipants(projectEntity.id),
			this.projectRepository.calculateProjectTotalHours(projectEntity.id)
		])

		return {
			projectEntity,
			projectParticipantEntities,
			status: this.getProjectStatus(projectEntity.dateStart, projectEntity.dateEnd),
			totalHours
		}
	}

	private async getProjectDetails(projectEntity: ProjectEntity): Promise<IProjectDetailsResponse> {
		const projectOverview = await this.getProjectOverview(projectEntity)

		return {
			...projectOverview,
			status: this.getProjectStatus(projectEntity.dateStart, projectEntity.dateEnd),
			totalDays: this.getProjectTotalDays(projectEntity.dateStart, projectEntity.dateEnd)
		}
	}

	private getProjectDBDetails(projectDetailsDBResponse: IProjectDetailsDBResponse): IProjectDetailsResponse {
		return {
			projectEntity: projectDetailsDBResponse.projectEntity,
			projectParticipantEntities: projectDetailsDBResponse.projectParticipantEntities,
			status: this.getProjectStatus(projectDetailsDBResponse.projectEntity.dateStart, projectDetailsDBResponse.projectEntity.dateEnd),
			totalHours: projectDetailsDBResponse.userActivityEntities.reduce((acc, current) => acc + (current.hours ?? 0), 0),
			totalDays: this.getProjectTotalDays(projectDetailsDBResponse.projectEntity.dateStart, projectDetailsDBResponse.projectEntity.dateEnd)
		}
	}

	private getProjectStatus(dateStart: Date, dateEnd: Date | null): ProjectStatus {
		const now = new Date()

		if (now.getTime() < dateStart.getTime()) {
			return ProjectStatus.Future
		}
		if (!dateEnd || DateHelper.isDateAfterDate(now, dateEnd)) {
			return ProjectStatus.Active
		}

		return ProjectStatus.Inactive
	}

	private getProjectTotalDays(dateStart: Date, dateEnd: Date | null): number {
		const now = new Date()

		if (now.getTime() < dateStart.getTime()) {
			return 0
		}
		if (dateEnd && dateEnd.getTime() < now.getTime()) {
			return DateHelper.calculateDaysBetweenDates(dateStart, dateEnd)
		}

		return DateHelper.calculateDaysBetweenDates(dateStart, now)
	}

	public filterProjectForUserHub(projectDetails: IProjectDetailsResponse, authUser: IAuthJwtPassportUserDataRequest): IProjectDetailsResponse {
		const currentUser = projectDetails.projectParticipantEntities.find(participant => participant.id === authUser.id)

		if (currentUser) {
			projectDetails.projectParticipantEntities = [currentUser]
			return projectDetails
		}
		throw new NotFoundException("User is not a member of this project")
	}
}
