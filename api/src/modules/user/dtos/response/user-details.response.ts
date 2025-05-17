import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { UserBaseResponse } from "./user-base.response"
import { UserActivityStatisticResponse } from "./activity/user-activity-statistic.response"
import { UserManagerShortResponse } from "./user-manager-short.response"
import { UserProjectsShortResponse } from "./user-projects-short.response"
import { TeamDetailsResponse } from "src/modules/team/dtos/team-details.response"
import { WorkPositionListItemResponse } from "src/modules/work-position/dtos/response/work-position-list-item.response"
import { UserAddressDetailsResponse } from "../../modules/user-address/dtos/response/user-address-details.response"
import { UserAssignedVacationDetailsResponse } from "../../modules/user-assigned-vacation/dtos/response/user-assigned-vacation-details.response"

export class UserDetailsResponse extends UserBaseResponse {
	@ApiPropertyOptional({ type: TeamDetailsResponse })
	team?: TeamDetailsResponse

	@ApiPropertyOptional({ type: WorkPositionListItemResponse })
	workPosition?: WorkPositionListItemResponse

	@ApiPropertyOptional({ type: UserManagerShortResponse })
	manager?: UserManagerShortResponse

	@ApiPropertyOptional({ type: UserProjectsShortResponse, isArray: true })
	projects?: UserProjectsShortResponse[]

	@ApiPropertyOptional({ type: UserAddressDetailsResponse, isArray: true })
	addresses?: UserAddressDetailsResponse[]

	@ApiPropertyOptional({ type: UserAssignedVacationDetailsResponse, isArray: true })
	assignedVacations?: UserAssignedVacationDetailsResponse[]

	@ApiProperty({ type: UserActivityStatisticResponse })
	activityStatistic!: UserActivityStatisticResponse

	isSupervisor?: boolean
}
