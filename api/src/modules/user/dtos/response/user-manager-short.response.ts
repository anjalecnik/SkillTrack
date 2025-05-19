import { ApiProperty } from "@nestjs/swagger"

export class UserManagerShortResponse {
	@ApiProperty({ description: "Manager id", example: 1 })
	id!: number

	@ApiProperty({ description: "Manager email", example: "bob.the.builder@gmail.com" })
	email!: string

	@ApiProperty({ description: "Manager name", example: "Wendy" })
	name!: string

	@ApiProperty({ description: "Manager surname", example: "The" })
	surname!: string
}
