import { ApiProperty } from "@nestjs/swagger"

export class PaginatedMetaResponse {
	@ApiProperty({ example: 18 })
	total!: number

	@ApiProperty({ example: 1 })
	page!: number

	@ApiProperty({ example: 1 })
	from!: number

	@ApiProperty({ example: 10 })
	to!: number
}
