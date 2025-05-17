import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator"
import { DB_VARCHAR_LENGTH_128 } from "src/utils/constants"

export class UserInvitationListItemRequest {
	@ApiProperty({ example: "john.doe@gmail.com" })
	@IsEmail()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_128)
	email!: string

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
