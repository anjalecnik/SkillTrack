import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsInt, IsISO31661Alpha2, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from "class-validator"
import { DB_VARCHAR_LENGTH_256, DB_VARCHAR_LENGTH_128, DB_VARCHAR_LENGTH_16, DB_VARCHAR_LENGTH_2 } from "src/utils/constants"
import { UserAddressType } from "src/utils/types/enums/user-address.enum"

export class UserAddressPatchRequest {
	@ApiPropertyOptional({ example: 1 })
	@IsInt()
	@IsPositive()
	@IsOptional()
	id?: number

	@ApiProperty({ example: "Vrbanska cesta 26a" })
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_256)
	streetAddress!: string

	@ApiProperty({ example: "Maribor" })
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_128)
	city!: string

	@ApiPropertyOptional({ example: "Stajerska" })
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_128)
	@IsOptional()
	state?: string

	@ApiPropertyOptional({ example: "2000" })
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_16)
	@IsOptional()
	postalCode?: string

	@ApiProperty({ example: "SI" })
	@IsISO31661Alpha2()
	@MaxLength(DB_VARCHAR_LENGTH_2)
	countryCode!: string

	@ApiProperty({ example: UserAddressType.Main, default: UserAddressType.Main })
	@IsEnum(UserAddressType)
	@MaxLength(DB_VARCHAR_LENGTH_16)
	type!: UserAddressType
}
