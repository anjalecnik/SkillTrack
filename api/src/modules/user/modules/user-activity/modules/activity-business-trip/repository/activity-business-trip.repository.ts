import { Injectable } from "@nestjs/common"
import { EntityManager, FindOptionsRelations, In } from "typeorm"
import { IActivityBusinessTripCreateDBRequest, IActivityRequestBusinessTripCreateDBRequest, IActivityRequestBusinessTripUpdateDBRequest } from "../interfaces"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { MailService } from "src/modules/mail/services/mail.service"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service"

const LOAD_RELATIONS: FindOptionsRelations<UserActivityRequestEntity> = {
	userActivities: true,
	project: true,
	user: { workPosition: true }
}

@Injectable()
export class ActivityBusinessTripRepository {
	constructor(
		private readonly masterDataSource: MasterDataSource,
		private readonly mailerService: MailService,
		private readonly activitySharedService: ActivitySharedService
	) {}

	async createActivityRequest(
		createBusinessTrip: IActivityRequestBusinessTripCreateDBRequest,
		createBusinessTripActivities: IActivityBusinessTripCreateDBRequest[]
	): Promise<UserActivityRequestEntity> {
		return this.masterDataSource.manager.transaction(async (entityManager: EntityManager) => {
			const activityRequestRepository = entityManager.getRepository(UserActivityRequestEntity)
			const activityRepository = entityManager.getRepository(UserActivityEntity)

			const newActivityRequest = await activityRequestRepository.save({ ...createBusinessTrip })
			await activityRepository.save(createBusinessTripActivities.map(activity => ({ ...activity, activityRequestId: newActivityRequest.id })))

			const user = await this.activitySharedService.getUserById(newActivityRequest.userId)
			await this.mailerService.sendMail(`${user.name} ${user.surname}`, UserActivityType.BusinessTrip, user.manager?.email)
			return activityRequestRepository.findOneOrFail({ where: { id: newActivityRequest.id }, relations: LOAD_RELATIONS })
		})
	}

	async updateActivityRequest(
		{ id, ...updateBusinessTrip }: IActivityRequestBusinessTripUpdateDBRequest,
		deleteBusinessTripActivities: UserActivityEntity[],
		createBusinessTripActivities: IActivityBusinessTripCreateDBRequest[]
	): Promise<UserActivityRequestEntity> {
		return this.masterDataSource.manager.transaction(async (entityManager: EntityManager) => {
			const activityRequestRepository = entityManager.getRepository(UserActivityRequestEntity)
			const activityRepository = entityManager.getRepository(UserActivityEntity)

			await activityRequestRepository.update(id, { ...updateBusinessTrip, status: UserActivityStatus.PendingApproval })
			await activityRepository.delete({ id: In(deleteBusinessTripActivities.map(activity => activity.id)) })
			await activityRepository.save(createBusinessTripActivities.map(activity => ({ ...activity, activityRequestId: id })))

			return activityRequestRepository.findOneOrFail({ where: { id }, relations: LOAD_RELATIONS })
		})
	}
}
