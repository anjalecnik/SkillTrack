import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { HolidayEntity } from "src/libs/db/entities/holiday.entity"
import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { UserAddressEntity } from "src/libs/db/entities/user-address.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { DateHelper } from "src/utils/helpers/date.helper"
import { IUserCommon } from "src/utils/types/interfaces"
import { And, Between, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm"

@Injectable()
export class UtilityRepository {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(ProjectEntity)
		private readonly projectRepository: Repository<ProjectEntity>,
		@InjectRepository(HolidayEntity)
		private readonly holidayRepository: Repository<HolidayEntity>,
		@InjectRepository(UserAddressEntity)
		private readonly addressRepository: Repository<UserAddressEntity>
	) {}

	async getUser(id: number): Promise<UserEntity | undefined> {
		return (await this.userRepository.findOne({ where: { id } })) ?? undefined
	}

	async getUserWithProjects(id: number): Promise<UserEntity | undefined> {
		return (await this.userRepository.findOne({ where: { id }, relations: { projects: true } })) ?? undefined
	}

	async getProject(id: number): Promise<ProjectEntity | undefined> {
		return (await this.projectRepository.findOne({ where: { id } })) ?? undefined
	}

	async getHolidaysOnDates(countryCode: string, dates: Date[]): Promise<HolidayEntity[]> {
		const dateConditions = dates.map(date => {
			const dateStartOfDay = DateHelper.getStartOfDay(date)
			const dateEndOfDay = DateHelper.getEndOfDay(date)
			return And(MoreThanOrEqual(dateStartOfDay), LessThanOrEqual(dateEndOfDay))
		})
		const orWhereCondition: FindOptionsWhere<HolidayEntity>[] = dateConditions.map((dateCondition): FindOptionsWhere<HolidayEntity> => ({ countryCode, date: dateCondition }))
		return this.holidayRepository.find({ where: orWhereCondition })
	}

	async getHolidaysInDateRange(countryCode: string, dateStart: Date, dateEnd: Date): Promise<HolidayEntity[]> {
		return this.holidayRepository.find({
			where: {
				countryCode: countryCode,
				date: Between(dateStart, dateEnd)
			}
		})
	}

	async getSubordinates(filter: IUserCommon): Promise<UserEntity[]> {
		return this.userRepository.find({ where: { managerId: filter.userId } })
	}
}
