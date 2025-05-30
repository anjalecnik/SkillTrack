import { ApiProperty } from "@nestjs/swagger"
import { TotalStatistics } from "./user-work-overview-total-statistics.response"
import { UserStatistics } from "./work-overview-user-statistics.response"
import { IUserWorkOverviewListHalResponse } from "../../interfaces/work-overview-list-hal-response.interface"

export class UserWorkOverviewListHalResponse implements IUserWorkOverviewListHalResponse {
	@ApiProperty({
		example: {
			self: { href: "api/users/4/work-overviews?projectIds=6&projectIds=7" }
		},
		description: "Links for the resource"
	})
	_links!: {
		self: { href: string }
	}

	@ApiProperty({ type: UserStatistics, isArray: true, description: "User statistics by project, and total statistics by user" })
	users!: UserStatistics[]

	@ApiProperty({ type: TotalStatistics, description: "Total statistics across all users" })
	total!: TotalStatistics
}
