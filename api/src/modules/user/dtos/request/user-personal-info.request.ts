import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from "class-validator"
import { DB_VARCHAR_LENGTH_128 } from "src/utils/constants"

export class UserPersonalInfoRequest {
	@ApiProperty({ example: "Joe" })
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_128)
	name!: string

	@ApiProperty({ example: "Mishica" })
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_128)
	surname!: string

	@ApiPropertyOptional({ example: "2023-05-15" })
	@IsDate()
	@IsOptional()
	@Type(() => Date)
	birthDate?: Date

	@ApiPropertyOptional({ example: "+38641853888" })
	@IsPhoneNumber()
	@IsOptional()
	phone?: string
}
