import { ApiProperty } from "@nestjs/swagger"

class User {
	@ApiProperty({ description: "User ID" })
	userId!: number

	@ApiProperty({ description: "User first name" })
	firstName!: string

	@ApiProperty({ description: "User last name" })
	lastName!: string
}

class EmbeddedProject {
	@ApiProperty({ description: "Project ID" })
	projectId!: number

	@ApiProperty({ description: "Project name" })
	name!: string
}

class ProjectStatistics {
	@ApiProperty({ type: EmbeddedProject, description: "Embedded project information" })
	_embedded!: EmbeddedProject

	@ApiProperty({ description: "Days on project" })
	daysOnProject!: number

	@ApiProperty({ description: "Days off project" })
	daysOffProject!: number

	@ApiProperty({ description: "Number of business trips" })
	businessTripsCount!: number

	@ApiProperty({ description: "Number of daily activities" })
	dailyActivityCount!: number

	@ApiProperty({ description: "Number of public holidays" })
	publicHolidayCount!: number

	@ApiProperty({ description: "Number of sick leave instances" })
	sickLeaveCount!: number

	@ApiProperty({ description: "Number of vacation instances" })
	vacationCount!: number
}

class TotalStatistics {
	@ApiProperty({ description: "Total days on project" })
	daysOnProject!: number

	@ApiProperty({ description: "Total days off project" })
	daysOffProject!: number

	@ApiProperty({ description: "Total number of business trips" })
	businessTripsCount!: number

	@ApiProperty({ description: "Total number of daily activities" })
	dailyActivityCount!: number

	@ApiProperty({ description: "Total number of public holidays" })
	publicHolidayCount!: number

	@ApiProperty({ description: "Total number of sick leave instances" })
	sickLeaveCount!: number

	@ApiProperty({ description: "Total number of vacation instances" })
	vacationCount!: number
}

class EmbeddedUser {
	@ApiProperty({ type: User, description: "User data" })
	user!: User
}

class ProjectsWrapper {
	@ApiProperty({
		type: ProjectStatistics,
		description: "Statistics for each project",
		isArray: true
	})
	project!: ProjectStatistics[]
}

export class UserStatistics {
	@ApiProperty({ type: EmbeddedUser, description: "Embedded user information" })
	_embedded!: EmbeddedUser

	@ApiProperty({ type: ProjectsWrapper })
	projects!: ProjectsWrapper

	@ApiProperty({ type: TotalStatistics, description: "Total statistics for the user" })
	totalUser!: TotalStatistics
}
