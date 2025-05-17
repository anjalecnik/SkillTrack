import { ApiProperty } from "@nestjs/swagger"

export class TeamDetailsResponse {
	@ApiProperty({ example: 1 })
	id!: number

	@ApiProperty({ example: "Name" })
	name!: string

	@ApiProperty({ example: "Description" })
	description!: string
}
