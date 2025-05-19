import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { UserStatus } from "src/utils/types/enums/user-status.enum"
import { Repository, DeepPartial } from "typeorm"

@Injectable()
export class UserAssignedVacationRepository {
	constructor(
		@InjectRepository(UserVacationAssignedEntity)
		private readonly userVacationAssignedRepository: Repository<UserVacationAssignedEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async getUserAssignedVacationAll(userId: number): Promise<UserVacationAssignedEntity[]> {
		return this.userVacationAssignedRepository.find({ where: { userId } })
	}

	async createAssignedVacationForYear(userId: number, year: number): Promise<UserVacationAssignedEntity> {
		return this.userVacationAssignedRepository.save({
			userId,
			year,
			createdByUserId: userId,
			updatedByUserId: userId
		})
	}

	//ONLY used in UserAssignedVacationImportService
	async updateAssignedVacation(id: number, updateData: DeepPartial<UserVacationAssignedEntity>): Promise<UserVacationAssignedEntity> {
		const vacationEntry = await this.userVacationAssignedRepository.findOne({ where: { id } })
		if (!vacationEntry) {
			throw new Error("Vacation entry not found")
		}
		Object.assign(vacationEntry, updateData)
		return this.userVacationAssignedRepository.save(vacationEntry)
	}

	async getUsersActive(): Promise<UserEntity[]> {
		return this.userRepository.find({ where: { status: UserStatus.Active } })
	}

	// async getVacationActivitiesWithoutAssignedVacationReference(dateStart: Date): Promise<UserActivityRequestEntity[]> {
	// 	return this.UserActivityRequestRepository.createQueryBuilder("request")
	// 		.innerJoinAndSelect("request.workspaceUserActivities", "activity", "activity.vacationAssignedId IS NULL AND activity.date > :dateStart", { dateStart })
	// 		.where("request.workspaceId = :workspaceId", { workspaceId })
	// 		.andWhere("request.activityType = :activityType", { activityType: WorkspaceUserActivityType.Vacation })
	// 		.andWhere("activity.status IN (:...status)", { status: [WorkspaceUserActivityStatus.PendingApproval, WorkspaceUserActivityStatus.Approved] })
	// 		.getMany()
	// }

	// async updateVacationActivityRequest(requestId: number, updateVacationActivities: WorkspaceUserActivityEntity[]): Promise<WorkspaceUserActivityRequestEntity> {
	// 	for (const activity of updateVacationActivities) {
	// 		await this.workspaceUserActivityRepository.update(activity.id, {
	// 			vacationAssignedId: activity.vacationAssignedId
	// 		})
	// 	}

	// 	return this.WorkspaceUserActivityRequestRepository.findOneOrFail({ where: { id: requestId }, relations: { workspaceUserActivities: true } })
	// }
}
