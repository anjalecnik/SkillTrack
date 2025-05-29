import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { TeamDetailsResponse } from "src/modules/team/dtos/team-details.response"
import { WorkPositionListItemResponse } from "src/modules/work-position/dtos/response/work-position-list-item.response"
import { UserRole } from "src/utils/types/enums/user-role.enum"
import { UserStatus } from "src/utils/types/enums/user-status.enum"
import { UserVacationStatisticResponse } from "./activity/user-vacation-statistic.response"

export class UserListItemResponse {
	@ApiProperty({ example: 1 })
	id!: number

	@ApiProperty({ example: "bob.the.builder@gmail.com" })
	email!: string

	@ApiProperty({ example: UserStatus.Active, enum: UserStatus })
	status!: UserStatus

	@ApiProperty({ example: UserRole.User, enum: UserRole })
	role!: UserRole

	@ApiProperty({ example: "Bob" })
	name!: string

	@ApiProperty({ example: "Builder" })
	surname!: string

	@ApiPropertyOptional({ example: 1 })
	averageScore?: number

	@ApiPropertyOptional({ type: UserVacationStatisticResponse })
	vacation?: UserVacationStatisticResponse

	@ApiPropertyOptional({ type: TeamDetailsResponse })
	team?: TeamDetailsResponse

	@ApiPropertyOptional({ type: WorkPositionListItemResponse })
	workPosition?: WorkPositionListItemResponse
}
