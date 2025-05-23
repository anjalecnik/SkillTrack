import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsEnum, IsIn, IsInt, Max, Min } from "class-validator"
import { IsoDateStringToUtcDate } from "src/utils/class-transformer"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { UserPerformanceReviewQuartal } from "src/utils/types/enums/user-performance-review-quartal.enum"

export class ActivityRequestPerformanceReviewCreateRequest {
	@ApiProperty({ description: "Activity type", enum: UserActivityType, example: UserActivityType.PerformanceReview })
	@IsEnum(UserActivityType)
	@IsIn([UserActivityType.PerformanceReview])
	activityType!: UserActivityType.PerformanceReview

	@ApiProperty({ description: "Date of activity", example: "2024-01-01" })
	@IsoDateStringToUtcDate(10)
	@IsDate()
	date!: Date

	@ApiProperty({ description: "Performance review quartal [Q1 - Q4]", example: UserPerformanceReviewQuartal.Q3, enum: UserPerformanceReviewQuartal })
	@IsEnum(UserPerformanceReviewQuartal)
	quartal!: UserPerformanceReviewQuartal

	@ApiProperty({ description: "Year for the review", example: 2024 })
	@IsInt()
	year!: number

	@ApiProperty({ description: "Answer to question 1", example: 3 })
	@IsInt()
	@Min(1)
	@Max(5)
	answer1!: number

	@ApiProperty({ description: "Answer to question 2", example: 4 })
	@IsInt()
	@Min(1)
	@Max(5)
	answer2!: number

	@ApiProperty({ description: "Answer to question 3", example: false })
	@IsBoolean()
	answer3!: boolean

	@ApiProperty({ description: "Answer to question 4", example: true })
	@IsBoolean()
	answer4!: boolean
}
