import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { UserAddressType } from "src/utils/types/enums/user-address.enum"

export class UserAddressDetailsResponse {
	@ApiProperty({ example: 1 })
	id!: number

	@ApiProperty({ example: "Vrbanska cesta 26a" })
	streetAddress!: string

	@ApiProperty({ example: "Maribor" })
	city!: string

	@ApiPropertyOptional({ example: "Stajerska" })
	state?: string

	@ApiPropertyOptional({ example: "2000" })
	postalCode?: string

	@ApiProperty({ example: "SI" })
	countryCode!: string

	@ApiProperty({ example: UserAddressType.Main })
	type!: UserAddressType
}
