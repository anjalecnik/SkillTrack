import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { UserStatus } from "src/utils/types/enums/user-status.enum"
import { UserRole } from "src/utils/types/enums/user-role.enum"

export class UserBaseResponse {
	@ApiProperty({ example: 1 })
	id!: number

	@ApiProperty({ example: "bob.the.builder@gmail.com" })
	email!: string

	@ApiProperty({ example: UserStatus.Active, enum: UserStatus })
	status!: UserStatus

	@ApiProperty({ example: UserRole.User, enum: UserRole })
	role!: UserRole

	@ApiProperty({ example: "Bob" })
	name!: string

	@ApiProperty({ example: "Builder" })
	surname!: string

	@ApiPropertyOptional({ example: "2000-01-11" })
	birthDate?: string

	@ApiPropertyOptional({ example: "+38641853888" })
	phone?: string
}
