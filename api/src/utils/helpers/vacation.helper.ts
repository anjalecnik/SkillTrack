import { IUserDetailsVacationCalculationResponse, IUserDetailsVacationResponse } from "src/modules/user/interfaces"
import { IVacationCalculation } from "../types/interfaces"
import { DateHelper } from "./date.helper"
import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity"

export abstract class VacationHelper {
	static calculateUsedVacation(oldYearVacation: IVacationCalculation | null, currentYearVacation: IVacationCalculation | null): IUserDetailsVacationResponse {
		const upcomingDays = this.getUpcomingDays(oldYearVacation, currentYearVacation)
		const { oldVacation, currentVacation } = this.getAllVacations(oldYearVacation, currentYearVacation)

		return {
			old: oldVacation,
			new: currentVacation,
			total: {
				assignedDays: oldVacation.assignedDays + currentVacation.assignedDays,
				usedDays: oldVacation.usedDays + currentVacation.usedDays,
				availableDays: oldVacation.availableDays + currentVacation.availableDays
			},
			upcoming: upcomingDays
		}
	}

	private static getAllVacations(
		oldYearVacation: IVacationCalculation | null,
		currentYearVacation: IVacationCalculation | null
	): { oldVacation: IUserDetailsVacationCalculationResponse; currentVacation: IUserDetailsVacationCalculationResponse } {
		const oldVacation = this.getVacation(oldYearVacation)
		const currentVacation = this.getVacation(currentYearVacation)

		const expirationDate = new Date(`${currentYearVacation?.vacationContract.year}-${currentYearVacation?.vacationContract.oldVacationExpiration}`)
		// Filter only activities before expiration
		const eligibleActivities =
			currentYearVacation?.vacationContract.vacations?.filter(vacation => {
				return DateHelper.isDateAfterOrEqualDate(new Date(vacation.date), expirationDate)
			}) ?? []
		const eligibleActivitiesCount = eligibleActivities.length

		//Vacation statistics are adjusted so old vacation is always used first
		if (oldVacation.availableDays > 0 && eligibleActivitiesCount > 0) {
			const adjustment = Math.min(oldVacation.availableDays, eligibleActivitiesCount)

			oldVacation.availableDays -= adjustment
			oldVacation.usedDays += adjustment

			currentVacation.usedDays -= adjustment
			currentVacation.availableDays += adjustment
		}
		return { oldVacation, currentVacation }
	}

	private static getVacation(vacation: IVacationCalculation | null): IUserDetailsVacationCalculationResponse {
		if (!vacation) {
			return {
				assignedDays: 0,
				usedDays: 0,
				availableDays: 0
			}
		}

		return {
			assignedDays: vacation.vacationContract.assignedDays!,
			usedDays: this.getUsedDays(vacation),
			availableDays: this.getAvailableDays(vacation)
		}
	}

	private static getUsedDays(vacation: IVacationCalculation): number {
		const usedDays = vacation.vacationContract.vacations?.length ?? 0
		const initialUsedDays = vacation.vacationContract.initialUsedDays ?? 0

		return usedDays + initialUsedDays
	}

	private static getAvailableDays(vacation: IVacationCalculation): number {
		const usedDays = vacation.vacationContract.vacations?.length ?? 0
		const initialUsedDays = vacation.vacationContract.initialUsedDays ?? 0

		return vacation.vacationContract.assignedDays! - (initialUsedDays + usedDays)
	}

	private static getUpcomingDays(oldYearVacation: IVacationCalculation | null, currentYearVacation: IVacationCalculation | null): number {
		const oldUpcommingDays = oldYearVacation?.upcomingVacationDays ?? 0
		const newUpcommingDays = currentYearVacation?.upcomingVacationDays ?? 0

		return oldUpcommingDays + newUpcommingDays
	}

	static getOldVacationExpirationDate(vacation: UserVacationAssignedEntity | undefined): Date {
		const referenceDate = DateHelper.addWorkspaceOffset("Europe/Ljubljana")

		if (vacation?.oldVacationExpiration) {
			return DateHelper.setDateOfCurrentYearFromMMDDFromat(vacation.oldVacationExpiration, referenceDate)
		}

		// Default expiration: December 31 of the current year
		const currentYear = referenceDate.getFullYear()
		return new Date(currentYear, 11, 31)
	}
}
