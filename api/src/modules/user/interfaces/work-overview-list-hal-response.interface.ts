export interface ITotalStatistics {
	usersCount: number
	workDays: number
	daysOnProjectSum: number
	daysOffProjectSum: number

	dailyActivitySum: number
	businessTripSum: number

	publicHolidaysSum: number
	sickLeaveSum: number
	vacationSum: number
}

export interface IProjectStatistics {
	_embedded: {
		projectId: number
		name: string
	}
	daysOnProject: number
	daysOffProject: number
	businessTripsCount: number
	dailyActivityCount: number

	publicHolidayCount: number
	sickLeaveCount: number
	vacationCount: number
}

export interface IUser {
	userId: number
	firstName: string
	lastName: string
}

export interface IUserStatistics {
	_embedded: {
		user: IUser
	}
	projects: {
		project: IProjectStatistics[]
	}
	totalUser: {
		daysOnProject: number
		daysOffProject: number
		businessTripsCount: number
		dailyActivityCount: number

		publicHolidayCount: number
		sickLeaveCount: number
		vacationCount: number
	}
}

export interface IUserWorkOverviewListHalResponse {
	_links: {
		self: { href: string }
	}

	users: IUserStatistics[]
	total: ITotalStatistics
}
