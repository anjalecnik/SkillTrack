import { Injectable, NotFoundException } from "@nestjs/common"
import { UtilityRepository } from "../repository/utility.repository"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { HolidayEntity } from "src/libs/db/entities/holiday.entity"
import { IWorkDayMeta } from "src/utils/types/interfaces"
import { DateHelper } from "src/utils/helpers/date.helper"

const SLOVENIA_WORKING_DAYS = [1, 2, 3, 4, 5] // Mon–Fri

export const SLOVENIAN_HOLIDAYS: { name: string; date: Date }[] = [
	{ name: "New Year's Day", date: new Date("2025-01-01") },
	{ name: "Preseren Day", date: new Date("2025-02-08") },
	{ name: "Easter Monday", date: new Date("2025-04-21") },
	{ name: "May Day", date: new Date("2025-05-01") },
	{ name: "Statehood Day", date: new Date("2025-06-25") },
	{ name: "Assumption Day", date: new Date("2025-08-15") },
	{ name: "All Saints Day", date: new Date("2025-11-01") },
	{ name: "Christmas Day", date: new Date("2025-12-25") },
	{ name: "Independence and Unity Day", date: new Date("2025-12-26") }
]

@Injectable()
export class UtilityService {
	constructor(private readonly utilityRepository: UtilityRepository) {}

	async getUserById(userId: number): Promise<UserEntity> {
		const userEntity = await this.utilityRepository.getUser(userId)
		if (!userEntity) throw new NotFoundException(`User not found`, `User'${userEntity}' does not exist`)
		return userEntity
	}

	async getUserWithProjectsById(userId: number): Promise<UserEntity> {
		const userEntity = await this.utilityRepository.getUserWithProjects(userId)
		if (!userEntity) throw new NotFoundException(`User not found`, `User'${userEntity}' does not exist`)
		return userEntity
	}

	async getProjectById(projectId: number): Promise<ProjectEntity> {
		const projectEntity = await this.utilityRepository.getProject(projectId)
		if (!projectEntity) throw new NotFoundException(`Project not found`, `Project'${projectEntity}' does not exist`)
		return projectEntity
	}

	async getHolidaysOnDateRangeByCountryCode(countryCode: string, dates: Date[]): Promise<HolidayEntity[]> {
		return this.utilityRepository.getHolidaysOnDates(countryCode, dates)
	}

	async getHolidaysInDateRange(dateStart: Date, dateEnd: Date): Promise<HolidayEntity[]> {
		const holidays = SLOVENIAN_HOLIDAYS.filter(holiday => holiday.date >= dateStart && holiday.date <= dateEnd).map((holiday, index) => ({
			...holiday,
			id: index + 1, // Dummy ID
			countryCode: "SI",
			createdAt: new Date(),
			updatedAt: new Date(),
			state: null,
			region: null
		})) as HolidayEntity[]

		return holidays
	}

	async getWorkDaysArray(): Promise<number[]> {
		const workingDays: number[] = [1, 2, 3, 4, 5]
		return Promise.resolve(workingDays)
	}

	async getWorkingDays(dates: Date[]): Promise<IWorkDayMeta[]> {
		return dates.map(date => {
			const matchedHolidays = SLOVENIAN_HOLIDAYS.filter(holiday => DateHelper.isSameDay(date, holiday.date)).map((holiday, index) => ({
				...holiday,
				id: index + 1, // dummy ID
				countryCode: "SI",
				createdAt: new Date(),
				updatedAt: new Date(),
				state: null,
				region: null
			})) as HolidayEntity[]

			const isHoliday = matchedHolidays.length > 0
			const isWeekend = !SLOVENIA_WORKING_DAYS.includes(date.getDay())
			const isWorkingDay = !isHoliday && !isWeekend

			return {
				date,
				isHoliday,
				isWorkFreeDay: isHoliday || isWeekend,
				isWorkingDay,
				holidays: matchedHolidays
			}
		})
	}

	async isUserSelfSuperior(userId: number): Promise<boolean> {
		const userEntity = await this.getUserById(userId)
		if (userEntity.managerId === null || userEntity.managerId === userEntity.id) return true
		return false
	}

	async getSubordinateIdsRecursively(userId: number, visitedIds: Set<number> = new Set(), maxLevel: number = 100, currentLevel: number = 0): Promise<number[]> {
		if (currentLevel >= maxLevel || visitedIds.has(userId)) {
			return []
		}
		visitedIds.add(userId)

		const directSubordinateIds = (await this.utilityRepository.getSubordinates({ userId })).map(user => user.id)
		const nestedResults = await Promise.all(directSubordinateIds.map(id => this.getSubordinateIdsRecursively(id, visitedIds, maxLevel, currentLevel + 1)))

		const allSubordinates = new Set([...directSubordinateIds, ...nestedResults.flat()])

		return Array.from(allSubordinates)
	}

	async isUserSupervisorToEmployee(supervisorId: number, employeeId: number) {
		const subordinateIds = await this.getSubordinateIdsRecursively(supervisorId, new Set())
		return subordinateIds.includes(employeeId)
	}
}
