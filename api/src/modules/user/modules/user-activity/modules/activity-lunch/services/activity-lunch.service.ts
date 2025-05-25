import { Injectable } from "@nestjs/common"
import { ActivityLunchRepository } from "../repository/activity-lunch.repository"
import { ILunchActivityCreateDBRequest, ILunchActivityCreateRequest } from "../interfaces"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

@Injectable()
export class ActivityLunchService {
	constructor(private readonly activityLunchRepository: ActivityLunchRepository) {}

	async createLunchActivity(createRequest: ILunchActivityCreateRequest): Promise<UserActivityEntity> {
		const lunchActivity: ILunchActivityCreateDBRequest = {
			userId: createRequest.userId,
			date: createRequest.date,
			status: UserActivityStatus.Approved,
			activityType: UserActivityType.Lunch,
			activityRequestId: createRequest.activityRequestId,
			reportedByUserId: createRequest.userId
		}

		return this.activityLunchRepository.createLunchActivity(lunchActivity)
	}

	async updateLunchActivity(newLunchState: boolean, createRequest: ILunchActivityCreateRequest): Promise<void> {
		const existingLunchActivities = await this.activityLunchRepository.getExistingLunch(createRequest)

		if ((existingLunchActivities.length > 0 && newLunchState) || (existingLunchActivities.length <= 0 && !newLunchState)) {
			return
		}
		if (existingLunchActivities.length > 0 && !newLunchState) {
			this.activityLunchRepository.deleteLunchActivity(existingLunchActivities)
		}
		if (existingLunchActivities.length <= 0 && newLunchState) {
			const lunchActivity: ILunchActivityCreateDBRequest = {
				userId: createRequest.userId,
				date: createRequest.date,
				status: UserActivityStatus.Approved,
				activityType: UserActivityType.Lunch,
				activityRequestId: createRequest.activityRequestId,
				reportedByUserId: createRequest.userId
			}
			this.activityLunchRepository.createLunchActivity(lunchActivity)
			return
		}
	}

	async deleteLunchActivity(deleteRequest: ILunchActivityCreateRequest): Promise<void> {
		this.activityLunchRepository.deleteLunchActivityByRequestId(deleteRequest)
	}

	async getLunchOnDay(createRequest: ILunchActivityCreateRequest): Promise<UserActivityEntity[]> {
		return this.activityLunchRepository.getExistingLunch(createRequest)
	}
}
