import { ApiProperty } from "@nestjs/swagger"
import { PaginatedMetaResponse } from "src/utils/types/dtos"
import { IActivityPerformanceReviewHalResponse } from "../../interfaces/activity-performance-review-hal-response.interface"
import { UserWithActivitiesPerformanceReview } from "./activity-performance-review-user.response"

export class ActivityPerformanceReviewHalResponse implements IActivityPerformanceReviewHalResponse {
	@ApiProperty({
		example: {
			self: { href: "api/activities?userIds=8&userIds=9" }
		},
		description: "Links for the resource"
	})
	_links!: {
		self: { href: string }
	}

	@ApiProperty({ type: UserWithActivitiesPerformanceReview, isArray: true, description: "List of users with their performance reviews" })
	data!: UserWithActivitiesPerformanceReview[]

	@ApiProperty({ type: Number, description: "Total number of users" })
	meta!: PaginatedMetaResponse
}
