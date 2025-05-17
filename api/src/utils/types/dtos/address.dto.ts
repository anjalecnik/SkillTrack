import { ApiProperty } from "@nestjs/swagger"
import { IsISO31661Alpha2, IsString, MaxLength } from "class-validator"
import { DB_VARCHAR_LENGTH_256, DB_VARCHAR_LENGTH_128, DB_VARCHAR_LENGTH_16, DB_VARCHAR_LENGTH_2 } from "src/utils/constants"

export class AddressDataDto {
	@ApiProperty({ example: "Vrbanska cesta 26a" })
	@IsString()
	@MaxLength(DB_VARCHAR_LENGTH_256)
	streetAddress!: string

	@ApiProperty({ example: "Maribor" })
	@IsString()
	@MaxLength(DB_VARCHAR_LENGTH_128)
	city!: string

	@ApiProperty({ example: "Stajerska" })
	@IsString()
	@MaxLength(DB_VARCHAR_LENGTH_128)
	state!: string | null

	@ApiProperty({ example: "2000" })
	@IsString()
	@MaxLength(DB_VARCHAR_LENGTH_16)
	postalCode!: string | null

	@ApiProperty({ example: "SI" })
	@IsISO31661Alpha2()
	@MaxLength(DB_VARCHAR_LENGTH_2)
	countryCode!: string
}
