import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsInt, IsOptional, IsString } from "class-validator"

export class PaginationPropsRequest {
	@ApiPropertyOptional({ default: 1 })
	@IsInt()
	@Type(() => Number)
	@IsOptional()
	page: number = 1

	@ApiPropertyOptional({ default: 50 })
	@IsInt()
	@Type(() => Number)
	@IsOptional()
	limit: number = 50

	@ApiPropertyOptional({ default: "asc", enum: ["asc", "desc"] })
	@IsString()
	@IsOptional()
	sortingDir: "desc" | "asc" = "asc"
}
