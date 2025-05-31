import { Injectable } from "@nestjs/common"
import { PaginatedMetaResponse } from "src/utils/types/dtos"
import { IPaginatedResponse } from "src/utils/types/interfaces"
import { UserListItemResponse } from "../dtos/response/user-list-item.response"
import { IUserPaginationItemResponse } from "../interfaces/user-pagination-item-response.interface"
import { IUserDetailsResponse } from "../interfaces/details-response.interface"
import { UserDetailsResponse } from "../dtos/response/user-details.response"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { UserBaseResponse } from "../dtos/response/user-base.response"
import { DateHelper } from "src/utils/helpers/date.helper"
import { UserInvitationListResponse } from "../dtos/response/user-invitation-list.response"
import { WorkPositionMapper } from "src/modules/work-position/mappers/work-position.mapper"
import { UserManagerShortResponse } from "../dtos/response/user-manager-short.response"
import { UserAddressMapper } from "../modules/user-address/mappers/user-address.mapper"
import { UserAssignedVacationMapper } from "../modules/user-assigned-vacation/mappers/user-assigned-vacation.mapper"
import { ProjectUserEntity } from "src/libs/db/entities/project-user.entity"
import { UserProjectsShortResponse } from "../dtos/response/user-projects-short.response"
import { UserActivityStatisticResponse } from "../dtos/response/activity/user-activity-statistic.response"
import { UserVacationStatisticResponse } from "../dtos/response/activity/user-vacation-statistic.response"

@Injectable()
export abstract class UserMapper {
	static mapUserPaginationList(users: IUserPaginationItemResponse[], meta: PaginatedMetaResponse): IPaginatedResponse<UserListItemResponse> {
		return {
			meta,
			data: users.map(user => this.mapUserListItem(user))
		}
	}

	static mapUserListItem(userDetails: IUserPaginationItemResponse): UserListItemResponse {
		const vacation = this.mapUserActivityStatisticsVacationDetails(userDetails)
		const avgScore = userDetails.performanceReviews?.length
			? userDetails.performanceReviews.reduce((sum, r) => sum + Number(r.score || 0), 0) / userDetails.performanceReviews.length
			: null

		return {
			id: userDetails.id,
			email: userDetails.email,
			status: userDetails.status,
			role: userDetails.role,
			name: userDetails.name,
			surname: userDetails.surname,

			workPosition: userDetails.workPosition ? WorkPositionMapper.mapWorkPositionListItem(userDetails.workPosition) : undefined,
			vacation: vacation,
			averageScore: avgScore ? Number(avgScore.toFixed(2)) : undefined
		}
	}

	static mapUserDetails({ userEntity, ...statistic }: IUserDetailsResponse): UserDetailsResponse {
		return {
			...this.mapUserBase(userEntity),

			workPosition: userEntity.workPosition ? WorkPositionMapper.mapWorkPositionListItem(userEntity.workPosition) : undefined,
			manager: this.mapUserManagerShort(userEntity.manager),
			projects: userEntity.projects?.map(project => this.mapUserProjectsShort(project)),
			addresses: userEntity.addresses?.map(address => UserAddressMapper.mapUserAddressDetails(address)),
			activityStatistic: this.mapWorkspaceUserActivityStatisticsDetails(statistic),
			assignedVacations: userEntity.assignedVacations?.map(vacation => UserAssignedVacationMapper.mapUserAssignedVacationDetails(vacation)),
			isSupervisor: statistic.isSupervisor
		}
	}

	static mapUserBase(userEntity: UserEntity): UserBaseResponse {
		return {
			id: userEntity.id,
			email: userEntity.email,
			status: userEntity.status,
			role: userEntity.role,
			name: userEntity.name,
			surname: userEntity.surname,
			birthDate: userEntity.birthDate ? DateHelper.formatIso8601DayString(userEntity.birthDate) : undefined,

			phone: userEntity.phone ?? undefined
		}
	}

	static mapUserInvitations(userEntities: UserEntity[]): UserInvitationListResponse {
		return {
			invitations: userEntities.map(userEntity => {
				return {
					userId: userEntity.id
				}
			})
		}
	}

	private static mapUserManagerShort(manager: UserEntity | undefined): UserManagerShortResponse | undefined {
		if (!manager) {
			return undefined
		}

		return {
			id: manager.id,
			name: manager.name,
			surname: manager.surname,
			email: manager.email
		}
	}

	private static mapWorkspaceUserActivityStatisticsDetails(
		statistic: Pick<IUserDetailsResponse, "activityRequestCount" | "sickLeave" | "vacation">
	): UserActivityStatisticResponse {
		return {
			activeRequestCount: statistic.activityRequestCount,
			sickLeave: { countDays: statistic.sickLeave.countDays },
			vacation: this.mapUserActivityStatisticsVacationDetails(statistic)
		}
	}
	private static mapUserActivityStatisticsVacationDetails(statistic: Pick<IUserDetailsResponse, "vacation">): UserVacationStatisticResponse | undefined {
		if (!statistic.vacation) {
			return
		}

		return {
			new: {
				usedDays: statistic.vacation.new.usedDays,
				assignedDays: statistic.vacation.new.assignedDays,
				availableDays: statistic.vacation.new.availableDays
			},
			old: {
				usedDays: statistic.vacation.old.usedDays,
				assignedDays: statistic.vacation.old.assignedDays,
				availableDays: statistic.vacation.old.availableDays
			},
			total: {
				usedDays: statistic.vacation.total.usedDays,
				assignedDays: statistic.vacation.total.assignedDays,
				availableDays: statistic.vacation.total.availableDays
			},
			upcoming: statistic.vacation.upcoming
		}
	}

	private static mapUserProjectsShort(project: ProjectUserEntity): UserProjectsShortResponse {
		return {
			id: project.projectId,
			name: project.project?.name ?? "",
			role: project.role,
			assignedPercentage: project.assignedPercentage,
			startDate: DateHelper.formatIso8601DayString(project.project!.dateStart),
			endDate: project.project!.dateEnd ? DateHelper.formatIso8601DayString(project.project!.dateEnd) : undefined
		}
	}
}
