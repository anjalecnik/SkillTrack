import { BadRequestException, Injectable } from "@nestjs/common"
import { UserWorkingHoursResponse } from "../dtos/response/user-working-hours.response"
import { IUserWorkingHoursDailyCreateRequest } from "../interfaces"
import { UserWorkingHoursType } from "src/utils/types/enums/user-working-hours.enum"
import { DateHelper } from "src/utils/helpers/date.helper"

@Injectable()
export class UserWorkingHoursService {
	constructor() {}

	addWorkingHours(workingHours: IUserWorkingHoursDailyCreateRequest[], date: Date): UserWorkingHoursResponse[] {
		const newWorkingHoursEntries: UserWorkingHoursResponse[] = []
		workingHours.forEach(workingHoursEntry => {
			const { workDateStart, workDateEnd } = this.getDateTimes(date, workingHoursEntry.timeRange.fromTimeStart, workingHoursEntry.timeRange.toTimeEnd)

			newWorkingHoursEntries.push({
				projectId: workingHoursEntry.projectId,
				fromDateStart: workDateStart,
				toDateEnd: workDateEnd,
				type: UserWorkingHoursType.Work
			})
		})

		this.validateOverlappingTimeRanges(newWorkingHoursEntries)
		return newWorkingHoursEntries
	}

	private getDateTimes(date: Date, fromTimeStart: string, toTimeEnd: string | null): { workDateStart: Date; workDateEnd: Date | null } {
		const [hours, minutes] = fromTimeStart.split(":").map(Number)
		const workDateStart = DateHelper.setDateTime(date, { hours, minutes })

		let workDateEnd: Date | null = null
		if (toTimeEnd) {
			const [hours, minutes] = toTimeEnd.split(":").map(Number)
			workDateEnd = DateHelper.setDateTime(date, { hours, minutes })
		}

		return { workDateStart, workDateEnd }
	}

	private validateOverlappingTimeRanges(workingHours: UserWorkingHoursResponse[]): void {
		const hasOverlappingRanges = workingHours.some((currentHours, currentIndex) =>
			workingHours.some(
				(comparedHours, comparedIndex) =>
					comparedIndex > currentIndex &&
					DateHelper.isDateRangeOverlappingExclusive(currentHours.fromDateStart, currentHours.toDateEnd, comparedHours.fromDateStart, comparedHours.toDateEnd)
			)
		)

		if (hasOverlappingRanges) {
			throw new BadRequestException("Working hours cannot overlap")
		}
	}
}
