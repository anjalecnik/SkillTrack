import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator"
import { ParseOptionalBoolean } from "src/utils/class-transformer"
import { PaginationPropsRequest } from "src/utils/types/dtos"
import { ProjectStatus } from "src/utils/types/enums/project-status.enum"
import { sortingFieldProjectValidationArray, ISortingFieldProject } from "../../interfaces"

export class ProjectOverviewPaginationFilterRequest extends PaginationPropsRequest {
	@ApiPropertyOptional({ example: [1, 2, 3], isArray: true })
	@IsOptional()
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	@Type(() => Number)
	ids?: number[]

	@ApiPropertyOptional({ example: "Magnum" })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	name?: string

	@ApiPropertyOptional({ example: [ProjectStatus.Active], isArray: true, enum: ProjectStatus })
	@IsEnum(ProjectStatus, { each: true })
	@IsOptional()
	@IsArray()
	statuses?: ProjectStatus[]

	@ApiPropertyOptional({ example: "id", default: "id", enum: sortingFieldProjectValidationArray })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@IsIn(sortingFieldProjectValidationArray)
	sort?: ISortingFieldProject = "id"

	@ApiPropertyOptional({ example: true })
	@IsOptional()
	@ParseOptionalBoolean()
	metadata?: boolean

	@ApiPropertyOptional({ example: [1, 2, 3], isArray: true })
	@IsOptional()
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	@Type(() => Number)
	userIds?: number[]
}
