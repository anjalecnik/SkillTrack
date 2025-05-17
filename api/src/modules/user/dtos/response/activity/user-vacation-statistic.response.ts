import { ApiProperty } from "@nestjs/swagger"
import { UserVacationStatisticDataResponse } from "./user-vacation-statistic-data.response"

export class UserVacationStatisticResponse {
	@ApiProperty({ description: "Current vacation statistic", type: UserVacationStatisticDataResponse })
	new!: UserVacationStatisticDataResponse

	@ApiProperty({ description: "Previous vacation statistic", type: UserVacationStatisticDataResponse })
	old!: UserVacationStatisticDataResponse

	@ApiProperty({ description: "Total vacation statistic", type: UserVacationStatisticDataResponse })
	total!: UserVacationStatisticDataResponse

	@ApiProperty({ description: "Upcoming vacation statistic" })
	upcoming!: number
}
