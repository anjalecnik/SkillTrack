import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsInt, IsOptional, IsPositive, Max, Min } from "class-validator"
import { ProjectUserRole } from "src/utils/types/enums/project-user-role.enum"

export class UserProjectPatchRequest {
	@ApiProperty({ description: "Id of project", example: 1 })
	@IsInt()
	@IsPositive()
	id!: number

	@ApiProperty({ description: "User role", example: ProjectUserRole.Lead })
	@IsEnum(ProjectUserRole)
	role!: ProjectUserRole

	@ApiPropertyOptional({ description: "Percentage of users time spent on the project", example: 50 })
	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(100)
	assignedPercentage?: number
}
