import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from "class-validator"
import { WorkPositionLevel } from "src/utils/types/enums/work-position.enum"

export class WorkPositionPatchRequest {
	@ApiPropertyOptional({ description: "Work position name", example: "Junior Backend Developer" })
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	@MaxLength(150)
	name?: string

	@ApiPropertyOptional({ description: "Work position level [L01 - L10]", example: WorkPositionLevel.L03, enum: WorkPositionLevel })
	@IsOptional()
	@IsEnum(WorkPositionLevel)
	level?: WorkPositionLevel

	@ApiPropertyOptional({ description: "Reference to promotion work position id", example: 1 })
	@IsInt()
	@IsOptional()
	@IsPositive()
	workPositionPromotionId?: number

	@ApiPropertyOptional({ description: "Description of work position", example: "Responsible for building REST Api" })
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	description?: string
}
