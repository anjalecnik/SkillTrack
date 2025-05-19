import { Injectable, NotFoundException } from "@nestjs/common"
import { UtilityRepository } from "../repository/utility.repository"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { HolidayEntity } from "src/libs/db/entities/holiday.entity"

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

	async getHolidaysInDateRange(countryCode: string, dateStart: Date, dateEnd: Date): Promise<HolidayEntity[]> {
		return this.utilityRepository.getHolidaysInDateRange(countryCode, dateStart, dateEnd)
	}

	async getWorkDaysArray(): Promise<number[]> {
		const workingDays: number[] = [1, 2, 3, 4, 5]
		return Promise.resolve(workingDays)
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
