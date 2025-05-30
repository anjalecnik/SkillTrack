import { ApiProperty } from "@nestjs/swagger"

export class TotalStatistics {
	@ApiProperty({ description: "Total count of users" })
	usersCount!: number

	@ApiProperty({ description: "Total number of work days" })
	workDays!: number

	@ApiProperty({ description: "Sum of days on project for all users" })
	daysOnProjectSum!: number

	@ApiProperty({ description: "Sum of days off project for all users" })
	daysOffProjectSum!: number

	@ApiProperty({ description: "Sum of daily activities for all users" })
	dailyActivitySum!: number

	@ApiProperty({ description: "Sum of business trips for all users" })
	businessTripSum!: number

	@ApiProperty({ description: "Sum of public holidays for all users" })
	publicHolidaysSum!: number

	@ApiProperty({ description: "Sum of sick leave instances for all users" })
	sickLeaveSum!: number

	@ApiProperty({ description: "Sum of vacation instances for all users" })
	vacationSum!: number
}
