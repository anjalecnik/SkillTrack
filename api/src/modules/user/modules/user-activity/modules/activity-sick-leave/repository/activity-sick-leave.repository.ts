import { Injectable } from "@nestjs/common"
import { EntityManager, FindOptionsRelations } from "typeorm"
import { IActivityRequestSickLeaveCreateDBRequest, IActivitySickLeaveCreateDBRequest } from "../interfaces"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"

const LOAD_RELATIONS: FindOptionsRelations<UserActivityRequestEntity> = {
	userActivities: true,
	project: true,
	user: { workPosition: true }
}

@Injectable()
export class ActivitySickLeaveRepository {
	constructor(private readonly masterDataSource: MasterDataSource) {}

	async createActivityRequest(
		createSickLeave: IActivityRequestSickLeaveCreateDBRequest,
		createSickLeaveActivities: IActivitySickLeaveCreateDBRequest[]
	): Promise<UserActivityRequestEntity> {
		return this.masterDataSource.manager.transaction(async (entityManager: EntityManager) => {
			const activityRequestRepository = entityManager.getRepository(UserActivityRequestEntity)
			const activityRepository = entityManager.getRepository(UserActivityEntity)

			const newActivityRequest = await activityRequestRepository.save({ ...createSickLeave })
			await activityRepository.save(createSickLeaveActivities.map(activity => ({ ...activity, activityRequestId: newActivityRequest.id })))
			return activityRequestRepository.findOneOrFail({ where: { id: newActivityRequest.id }, relations: LOAD_RELATIONS })
		})
	}
}
