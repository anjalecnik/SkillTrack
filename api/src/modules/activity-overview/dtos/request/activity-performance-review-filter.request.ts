import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min } from "class-validator"
import { Type } from "class-transformer"
import { PaginationPropsRequest } from "src/utils/types/dtos"
import { ISortingFieldUserActivityPerformanceReviewPaginationRequest } from "../../interfaces/db/activity-performance-review-filter-db.interface"
import { sortingFieldUserActivityPaginationRequestValidationArray } from "src/modules/user/modules/user-activity/interfaces"

export class ActivityPerformanceReviewFilterRequest extends PaginationPropsRequest implements PaginationPropsRequest {
	@ApiPropertyOptional({ example: "Bob" })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	fullName?: string

	@ApiPropertyOptional({ example: 2024 })
	@IsOptional()
	@IsInt()
	@IsPositive()
	@Type(() => Number)
	year?: number

	@ApiPropertyOptional({ example: 1 })
	@IsOptional()
	@IsInt()
	@Min(0)
	@Type(() => Number)
	showSubordinatesByLevel: number = 1

	@ApiPropertyOptional({ example: "name" })
	@IsString()
	@IsIn(sortingFieldUserActivityPaginationRequestValidationArray)
	@IsOptional()
	sort?: ISortingFieldUserActivityPerformanceReviewPaginationRequest = "name"
}
