import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { PaginationPropsRequest } from "src/utils/types/dtos"

export class GetTeamsQuery extends PaginationPropsRequest {
	@ApiPropertyOptional({ example: "John Doe" })
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	name?: string

	@ApiPropertyOptional({ default: "createDate" })
	@IsString()
	@IsOptional()
	sort!: SortingField

	@ApiPropertyOptional({ default: "desc", enum: ["asc", "desc"] })
	@IsString()
	@IsOptional()
	sortingDir: "desc" | "asc" = "desc"
}

export type SortingField = Omit<"sort" | "sortingDir", keyof GetTeamsQuery> & string
