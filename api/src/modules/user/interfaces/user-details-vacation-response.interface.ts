export interface IUserDetailsVacationCalculationResponse {
	assignedDays: number
	usedDays: number
	availableDays: number
}

export interface IUserDetailsVacationResponse {
	old: IUserDetailsVacationCalculationResponse
	new: IUserDetailsVacationCalculationResponse
	total: IUserDetailsVacationCalculationResponse
	upcoming: number
}
