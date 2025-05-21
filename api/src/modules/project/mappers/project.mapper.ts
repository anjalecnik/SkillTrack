import { Injectable } from "@nestjs/common"
import { DateHelper } from "src/utils/helpers/date.helper"
import { PaginatedMetaResponse } from "src/utils/types/dtos"
import { IPaginatedResponse } from "src/utils/types/interfaces"
import { ProjectDetailsResponse } from "../dtos/response/project-details.response"
import { IProjectDetailsResponse, IProjectOverviewPaginationItemResponse } from "../interfaces"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { ProjectUserRole } from "src/utils/types/enums/project-user-role.enum"
import { ProjectParticipantShortResponse } from "../dtos/response/project-participant-short.response"
import { ProjectOverviewListItemResponse } from "../dtos/response/project-overview-list-item.response"

@Injectable()
export abstract class ProjectMapper {
	static mapProjectDetails({ projectEntity, projectParticipantEntities, status, totalHours, totalDays }: IProjectDetailsResponse): ProjectDetailsResponse {
		return {
			id: projectEntity.id,
			name: projectEntity.name,
			status,
			type: projectEntity.type ?? undefined,
			dateStart: DateHelper.formatIso8601DayString(projectEntity.dateStart),
			dateEnd: projectEntity.dateEnd ? DateHelper.formatIso8601DayString(projectEntity.dateEnd) : undefined,
			participants: projectParticipantEntities.map(participant => this.mapProjectParticipantShort(participant, projectEntity.id)),
			totalHours,
			totalDays
		}
	}

	static mapProjectOverviewPaginationList(projects: IProjectOverviewPaginationItemResponse[], meta: PaginatedMetaResponse): IPaginatedResponse<ProjectOverviewListItemResponse> {
		return {
			meta,
			data: projects.map(project => this.mapProjectOverviewListItem(project))
		}
	}

	private static mapProjectParticipantShort(member: UserEntity, projectId: number): ProjectParticipantShortResponse {
		return {
			id: member.id,
			name: member.name,
			surname: member.surname,
			projectRole: member.projects!.find(project => project.projectId === projectId)?.role ?? ProjectUserRole.Member
		}
	}

	private static mapProjectOverviewListItem(projectOverview: IProjectOverviewPaginationItemResponse): ProjectOverviewListItemResponse {
		return {
			id: projectOverview.id,
			name: projectOverview.name,
			status: projectOverview.status,
			dateStart: DateHelper.formatIso8601DayString(projectOverview.dateStart),
			dateEnd: projectOverview.dateEnd ? DateHelper.formatIso8601DayString(projectOverview.dateEnd) : undefined,
			participants: projectOverview.participants ? projectOverview.participants.map(participant => this.mapProjectParticipantShort(participant, projectOverview.id)) : undefined,
			totalHours: projectOverview.totalHours
		}
	}
}
