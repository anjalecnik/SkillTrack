import { ApiProperty } from "@nestjs/swagger"

export class UserSickLeaveStatisticResponse {
	@ApiProperty({ description: "Count of sickLeave Days", example: 1 })
	countDays!: number
}
