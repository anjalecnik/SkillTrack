import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator"
import { PaginationPropsRequest } from "src/utils/types/dtos"
import { WorkPositionLevel } from "src/utils/types/enums/work-position.enum"
import { ISortingFieldWorkPosition, sortingFieldWorkPositionValidationArray } from "../../interfaces"

export class WorkPositionPaginationFilterRequest extends PaginationPropsRequest {
	@ApiPropertyOptional({ example: 1, isArray: true })
	@IsOptional()
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	@Type(() => Number)
	ids?: number[]

	@ApiPropertyOptional({ example: "Backend Developer" })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	name?: string

	@ApiPropertyOptional({ description: "Work position level [L01 - L10]", example: WorkPositionLevel.L03, enum: WorkPositionLevel, isArray: true })
	@IsEnum(WorkPositionLevel, { each: true })
	@IsOptional()
	@IsArray()
	levels?: WorkPositionLevel[]

	@ApiPropertyOptional({ example: "id", default: "id" })
	@IsOptional()
	@IsString()
	@IsIn(sortingFieldWorkPositionValidationArray)
	sort?: ISortingFieldWorkPosition = "id"
}
