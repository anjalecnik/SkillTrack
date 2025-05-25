import { BadRequestException, Injectable } from "@nestjs/common"
import { UserAssignedVacationService } from "../../../../user-assigned-vacation/services/user-assigned-vacation.service"
import { IActivitySharedRequestCancelRequest, IActivitySharedRequestReviewRequest } from "../../activity-shared/interfaces"
import { ActivitySharedDBMapper } from "../../activity-shared/mappers/activity-shared-db.mapper"
import { ActivitySharedService } from "../../activity-shared/services/activity-shared.service"
import { ActivitySharedRequestActionsService } from "../../activity-shared/services/activity-shared-request-actions.service"
import { IActivityRequestVacationCreateRequest, IActivityRequestVacationEntityEnriched, IActivityVacationCreateDBRequest } from "../interfaces"
import { ActivityVacationDBMapper } from "../mappers/activity-vacation-db.mapper"
import { ActivityVacationRepository } from "../repository/activity-vacation.repository"
import { ActivityVacationValidationService } from "./activity-vacation-validation.service"
import { IInvokerMetadata } from "../../activity-shared/interfaces"
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { ActivityRequestTypeHelper } from "src/utils/helpers/activity-request-type.helper"
import { DateHelper } from "src/utils/helpers/date.helper"
import { UserActivityType } from "src/utils/types/enums/user-activity.enum"
import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity"
import { VacationHelper } from "src/utils/helpers/vacation.helper"

@Injectable()
export class ActivityVacationService {
	constructor(
		private readonly activitySharedService: ActivitySharedService,
		private readonly activityVacationRepository: ActivityVacationRepository,
		private readonly activityVacationValidationService: ActivityVacationValidationService,
		private readonly userAssignedVacationService: UserAssignedVacationService,
		private readonly activitySharedRequestActionsService: ActivitySharedRequestActionsService
	) {}

	async createActivityRequest(
		userInvoker: IInvokerMetadata,
		activityVacationCreateRequest: IActivityRequestVacationCreateRequest
	): Promise<IActivityRequestVacationEntityEnriched> {
		const dates = await this.activitySharedService.getDatesFromRange(activityVacationCreateRequest)
		const activityVacations = await this.linkVacationToAssignedVacation(activityVacationCreateRequest, dates)
		const { activityRequest, activities } = ActivityVacationDBMapper.createActivityRequest(activityVacationCreateRequest, activityVacations)

		await this.activityVacationValidationService.preCreateSaveValidation(activityRequest, activities)
		const activityVacationEntity = await this.activityVacationRepository.createActivityRequest(activityRequest, activities)

		return this.enrichActivityRequest(userInvoker.user.id, activityVacationEntity)
	}

	async cancelActivityRequest(userInvoker: IInvokerMetadata, activityVacationCancelRequest: IActivitySharedRequestCancelRequest): Promise<IActivityRequestVacationEntityEnriched> {
		const activityVacationEntity = await this.activityVacationValidationService.preCancelTransformValidation(activityVacationCancelRequest)
		const { activityRequest, activityDaily } = ActivitySharedDBMapper.cancelActivity(activityVacationCancelRequest, activityVacationEntity.userActivities)

		this.activityVacationValidationService.preCancelSaveValidation(activityVacationEntity, activityRequest)
		const canceledActivityVacationEntity = await this.activitySharedService.cancelActivityRequest(activityRequest, activityDaily)

		return this.enrichActivityRequest(userInvoker.user.id, canceledActivityVacationEntity)
	}

	async reviewActivityRequest(
		userInvoker: IAuthJwtPassportUserRequest,
		activityVacationReviewRequest: IActivitySharedRequestReviewRequest
	): Promise<IActivityRequestVacationEntityEnriched> {
		const activityVacationEntity = await this.activityVacationValidationService.preReviewTransformValidation(activityVacationReviewRequest)
		const { activityRequest, activityDaily } = ActivitySharedDBMapper.reviewActivity(activityVacationReviewRequest, activityVacationEntity.userActivities)

		this.activityVacationValidationService.preReviewSaveValidation(activityVacationEntity, activityRequest)
		const reviewedActivityVacationEntity = await this.activitySharedService.reviewActivityRequest(activityRequest, activityDaily)

		const reviewedActivityVacations = reviewedActivityVacationEntity.userActivities ?? []

		return this.enrichActivityRequest(userInvoker.user.id, reviewedActivityVacationEntity)
	}

	async enrichActivityRequest(
		userInvoker: number | UserEntity,
		activityRequest: UserActivityRequestEntity,
		subordinateIds: number[] = []
	): Promise<IActivityRequestVacationEntityEnriched> {
		const activityRequestTypeSafe = ActivityRequestTypeHelper.setAsActivityRequest(activityRequest, UserActivityType.Vacation)
		const actions = await this.activitySharedRequestActionsService.getActivityRequestActions(userInvoker, activityRequest, subordinateIds)
		return {
			...activityRequestTypeSafe,
			actions
		}
	}

	async linkVacationToAssignedVacation(activityVacationCreateRequest: IActivityRequestVacationCreateRequest, dates: Date[]): Promise<IActivityVacationCreateDBRequest[]> {
		const { currentYearVacation, previousYearVacation } = await this.getCurrentAndPreviousAssignedVacations(activityVacationCreateRequest.userId)

		const oldVacationExpirationDate = VacationHelper.getOldVacationExpirationDate(currentYearVacation)
		let currentLeftover = await this.getLeftover(currentYearVacation)
		let previousLeftover = await this.getLeftover(previousYearVacation)

		const isValidDateFrame = (date: Date, expirationDate: Date | undefined | null): boolean => {
			if (!expirationDate) return false
			return date <= expirationDate
		}

		const activityVacations = dates.map((date, index) => {
			if (previousLeftover > 0 && previousYearVacation && isValidDateFrame(date, oldVacationExpirationDate)) {
				previousLeftover -= 1
				return ActivityVacationDBMapper.createActivityVacation(activityVacationCreateRequest, date, previousYearVacation.id)
			}

			if (currentLeftover > 0 && currentYearVacation) {
				currentLeftover -= 1
				return ActivityVacationDBMapper.createActivityVacation(activityVacationCreateRequest, date, currentYearVacation.id)
			}
			throw new BadRequestException(
				`Not enough assigned vacation days. Shorten your vacation for ${dates.length - index} days.`,
				`Not enough assigned vacation days. Requested vacation length: ${dates.length} for workspace user ID: '${activityVacationCreateRequest.userId}'`
			)
		})
		return activityVacations
	}

	private async getCurrentAndPreviousAssignedVacations(
		userId: number
	): Promise<{ currentYearVacation: UserVacationAssignedEntity; previousYearVacation: UserVacationAssignedEntity | undefined }> {
		const currentDate = DateHelper.addWorkspaceOffset("Europe/Ljubljana")
		const previousDate = DateHelper.subtract(currentDate, 1, "years")
		const currentYear = currentDate.getFullYear()
		const previousYear = previousDate.getFullYear()
		let currentYearVacation = await this.activityVacationRepository.getUserAssignedVacation(userId, currentYear)
		const previousYearVacation = await this.activityVacationRepository.getUserAssignedVacation(userId, previousYear)

		if (!currentYearVacation) {
			currentYearVacation = await this.userAssignedVacationService.createAssignedVacationForYear(userId, currentYear)
		}

		return {
			currentYearVacation,
			previousYearVacation
		}
	}

	private async getLeftover(vacation: UserVacationAssignedEntity | undefined): Promise<number> {
		if (!vacation) {
			return 0
		}

		const vacationsUsed = vacation.vacations?.length ?? 0
		const vacationsUsedInitial = vacation.initialUsedDays ?? 0
		const vacationsUsedTotal = vacationsUsed + vacationsUsedInitial

		const assignedDays = vacation.assignedDays ? vacation.assignedDays : 50

		return assignedDays - vacationsUsedTotal
	}
}
