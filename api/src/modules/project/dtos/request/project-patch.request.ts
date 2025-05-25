import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"
import { IsoDateStringToUtcDate } from "src/utils/class-transformer"
import { DB_VARCHAR_LENGTH_64 } from "src/utils/constants"
import { ProjectType } from "src/utils/types/enums/project.enum"

export class ProjectPatchRequest {
	@ApiPropertyOptional({ example: "InovaIT" })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_64)
	name?: string

	@ApiPropertyOptional({ example: ProjectType.Internal })
	@IsOptional()
	@IsEnum(ProjectType)
	type?: ProjectType

	@ApiPropertyOptional({ example: "2024-08-25" })
	@IsOptional()
	@IsoDateStringToUtcDate(10)
	@IsDate()
	dateStart?: Date

	// IsAfterOrEqualDate check is made in service
	@ApiPropertyOptional({ example: "2024-08-25" })
	@IsOptional()
	@IsoDateStringToUtcDate(10)
	@IsDate()
	dateEnd?: Date | null
}
