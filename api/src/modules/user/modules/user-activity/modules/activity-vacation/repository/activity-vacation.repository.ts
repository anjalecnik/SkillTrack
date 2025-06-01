import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { EntityManager, FindOptionsRelations, Repository } from "typeorm"
import { IActivityRequestVacationCreateDBRequest, IActivityVacationCreateDBRequest } from "../interfaces"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { MailService } from "src/modules/mail/services/mail.service"
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"

const LOAD_RELATIONS: FindOptionsRelations<UserActivityRequestEntity> = {
	userActivities: true,
	project: true,
	user: { workPosition: true }
}

@Injectable()
export class ActivityVacationRepository {
	constructor(
		@InjectRepository(UserVacationAssignedEntity)
		private readonly userVacationAssignedRepository: Repository<UserVacationAssignedEntity>,
		private readonly masterDataSource: MasterDataSource,
		private readonly mailerService: MailService,
		private readonly activitySharedService: ActivitySharedService
	) {}

	async createActivityRequest(
		createVacation: IActivityRequestVacationCreateDBRequest,
		createVacationActivities: IActivityVacationCreateDBRequest[]
	): Promise<UserActivityRequestEntity> {
		return this.masterDataSource.manager.transaction(async (entityManager: EntityManager) => {
			const activityRequestRepository = entityManager.getRepository(UserActivityRequestEntity)
			const activityRepo = entityManager.getRepository(UserActivityEntity)

			const newActivityRequest = await activityRequestRepository.save({ ...createVacation })
			await activityRepo.save(createVacationActivities.map(activity => ({ ...activity, activityRequestId: newActivityRequest.id })))

			const user = await this.activitySharedService.getUserById(newActivityRequest.userId)
			await this.mailerService.sendMail(`${user.name} ${user.surname}`, UserActivityType.Vacation, user.manager?.email)
			return activityRequestRepository.findOneOrFail({ where: { id: newActivityRequest.id }, relations: LOAD_RELATIONS })
		})
	}

	async getUserAssignedVacation(userId: number, year: number): Promise<UserVacationAssignedEntity | undefined> {
		return (
			(await this.userVacationAssignedRepository
				.createQueryBuilder("userVacationAssigned")
				.leftJoinAndSelect("userVacationAssigned.vacations", "vacation", "vacation.status IN (:...status)", {
					status: [UserActivityStatus.Approved, UserActivityStatus.PendingApproval]
				})
				.where({ userId, year })
				.getOne()) ?? undefined
		)
	}
}
