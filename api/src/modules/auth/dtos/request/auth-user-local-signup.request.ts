import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { DB_VARCHAR_LENGTH_4, DB_VARCHAR_LENGTH_64, DB_VARCHAR_LENGTH_8, DB_VARCHAR_LENGTH_32 } from "src/utils/constants"

export class AuthUserLocalSignupRequest {
	@ApiProperty({ example: "bob.the.builder@inova.si" })
	@IsEmail()
	@IsNotEmpty()
	@MinLength(DB_VARCHAR_LENGTH_4)
	@MaxLength(DB_VARCHAR_LENGTH_64)
	email!: string

	@ApiProperty({ example: "mySuperSecretPassword" })
	@IsString()
	@IsNotEmpty()
	@MinLength(DB_VARCHAR_LENGTH_8)
	@MaxLength(DB_VARCHAR_LENGTH_32)
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*:;/<>?~_-])(?=.{10,})/, {
		message: "Password is too weak!"
	})
	password!: string
}
