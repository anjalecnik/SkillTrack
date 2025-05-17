import { ApiProperty } from "@nestjs/swagger"

export class UserIsSupervisorResponse {
	@ApiProperty({ example: true })
	isSupervisor!: boolean
}
