import { ApiProperty } from "@nestjs/swagger"
import { IPerformanceReviewActivity } from "../../interfaces/activity-performance-review-hal-response.interface"

export class UserWithActivitiesPerformanceReview {
	@ApiProperty({ description: "User first name" })
	name!: string

	@ApiProperty({ description: "User last name" })
	surname!: string

	@ApiProperty({ description: "User middle name" })
	middleName?: string | null

	@ApiProperty({ description: "User email" })
	email!: string

	@ApiProperty({ description: "User performance review scores", isArray: true })
	scores!: IPerformanceReviewActivity[]
}
