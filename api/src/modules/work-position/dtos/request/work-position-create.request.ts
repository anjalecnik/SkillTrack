import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from "class-validator"
import { WorkPositionLevel } from "src/utils/types/enums/work-position.enum"

export class WorkPositionCreateRequest {
	@ApiProperty({ description: "Work position name", example: "Junior Backend Developer" })
	@IsNotEmpty()
	@IsString()
	@MaxLength(150)
	name!: string

	@ApiProperty({ description: "Work position level [L01 - L10]", example: WorkPositionLevel.L03, enum: WorkPositionLevel })
	@IsEnum(WorkPositionLevel)
	level!: WorkPositionLevel
	WorkPositionLevel
	@ApiPropertyOptional({ description: "Reference to promotion work position id", example: 1 })
	@IsInt()
	@IsPositive()
	@IsOptional()
	workPositionPromotionId?: number

	@ApiProperty({ description: "Description of work position", example: "Responsible for building REST Api" })
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	description!: string
}
