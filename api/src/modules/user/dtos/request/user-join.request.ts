import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength } from "class-validator"
import { DB_VARCHAR_LENGTH_128 } from "src/utils/constants"

export class UserJoinRequest {
	@ApiProperty({ example: "John" })
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_128)
	name!: string

	@ApiProperty({ example: "Doe" })
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_128)
	surname!: string
}
