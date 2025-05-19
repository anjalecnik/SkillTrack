export interface IWorkDayFilter {
	holidays: boolean
	workingDays: boolean
}

export const workDayDefaultFilter: IWorkDayFilter = { holidays: true, workingDays: true }
