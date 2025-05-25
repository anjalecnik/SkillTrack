import { Injectable } from "@nestjs/common"
import { Between, Repository } from "typeorm"
import { ILunchActivityCreateDBRequest, ILunchActivityCreateRequest } from "../interfaces"
import { InjectRepository } from "@nestjs/typeorm"
import { DateHelper } from "src/utils/helpers/date.helper"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

@Injectable()
export class ActivityLunchRepository {
	constructor(
		@InjectRepository(UserActivityEntity)
		private readonly activityRepository: Repository<UserActivityEntity>
	) {}

	async createLunchActivity(activity: ILunchActivityCreateDBRequest): Promise<UserActivityEntity> {
		return this.activityRepository.save({ ...activity })
	}

	async getExistingLunch(findOptions: ILunchActivityCreateRequest): Promise<UserActivityEntity[]> {
		const endOfDay = DateHelper.getEndOfDay(findOptions.date)
		const startOfDay = DateHelper.getStartOfDay(findOptions.date)
		return this.activityRepository.find({
			where: {
				userId: findOptions.userId,
				date: Between(startOfDay, endOfDay),
				activityRequestId: findOptions.activityRequestId,
				activityType: UserActivityType.Lunch
			}
		})
	}

	async deleteLunchActivity(lunchActivity: UserActivityEntity[]): Promise<void> {
		await this.activityRepository.remove(lunchActivity)
	}

	async deleteLunchActivityByRequestId(findOptions: ILunchActivityCreateRequest): Promise<void> {
		await this.activityRepository.delete({
			userId: findOptions.userId,
			date: findOptions.date,
			activityRequestId: findOptions.activityRequestId,
			activityType: UserActivityType.Lunch
		})
	}
}
