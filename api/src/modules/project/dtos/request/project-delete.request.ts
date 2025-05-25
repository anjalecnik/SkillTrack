import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsInt, IsPositive } from "class-validator"

export class ProjectDeleteRequest {
	@ApiProperty({ example: [1, 4], isArray: true })
	@IsArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	@Type(() => Number)
	ids!: number[]
}
