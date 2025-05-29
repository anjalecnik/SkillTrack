import { ApiProperty } from "@nestjs/swagger"

export class JiraStatisticsResponse {
	@ApiProperty({ example: "Janez novak" })
	user: string

	@ApiProperty()
	accountId: string

	@ApiProperty({ example: 5 })
	todo: number

	@ApiProperty({ example: 2 })
	inProgress: number

	@ApiProperty({ example: 12 })
	done: number

	@ApiProperty({ example: 24 })
	totalDoneHistory: number

	@ApiProperty({ example: 7 })
	totalAssigned: number
}
