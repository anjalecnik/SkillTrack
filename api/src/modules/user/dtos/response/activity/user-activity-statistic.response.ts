import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { UserSickLeaveStatisticResponse } from "./user-sick-leave-statistic.response"
import { UserVacationStatisticResponse } from "./user-vacation-statistic.response"

export class UserActivityStatisticResponse {
	@ApiProperty({ description: "Currently active requests", example: 1 })
	activeRequestCount!: number

	@ApiPropertyOptional({ type: UserVacationStatisticResponse })
	vacation?: UserVacationStatisticResponse

	@ApiProperty({ type: UserSickLeaveStatisticResponse })
	sickLeave!: UserSickLeaveStatisticResponse
}
