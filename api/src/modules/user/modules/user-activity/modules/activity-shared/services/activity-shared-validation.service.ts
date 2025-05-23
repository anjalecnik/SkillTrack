import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common"
import { IActivitySharedReporterValidation } from "../interfaces"
import { UtilityService } from "src/modules/utility/services/utility.service"
import { originHub } from "src/utils/types/enums/origin-hub.enum"
import { RequiredNotNull } from "src/utils/types/interfaces"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserActivityStatus } from "src/utils/types/enums/user-activity-status.enum"
import { UserRole } from "src/utils/types/enums/user-role.enum"

@Injectable()
export class ActivitySharedValidationService {
	constructor(private readonly utilityService: UtilityService) {}

	/**
	 * @returns returns true if user is Owner or Admin
	 */
	async validateWorkspaceViolationAndGetIsPrivilege({ userId, reportedByUserId }: IActivitySharedReporterValidation, requestOriginHub: originHub): Promise<boolean> {
		const [user, reportedBy] = await Promise.all([this.utilityService.getUserById(userId), this.utilityService.getUserById(reportedByUserId)])

		const isSupervisor = await this.utilityService.isUserSupervisorToEmployee(reportedBy.id, user.id)
		const isPrivileged = requestOriginHub === originHub.workspaceHub || isSupervisor

		// User is reporting for other user
		if (user.id !== reportedBy.id) {
			// Check moderator|admin permissions
			if (!isPrivileged)
				throw new UnauthorizedException("User lacks permissions to report for others", `User ID: '${reportedBy.id}' does not have permission to report activities'`)
		}

		return isPrivileged
	}

	async validateIsWorkingDays(days: Date[]): Promise<void> {
		const workDay = await this.utilityService.getWorkingDays(days)
		workDay.map(workDay => {
			if (workDay.isHoliday) throw new BadRequestException("Can not report on holiday")
			if (workDay.isWorkFreeDay) throw new BadRequestException(`Can not report on this day because is not part of working days`)
		})
	}

	async validateReviewer(
		activity: Required<Pick<UserActivityEntity, "userId" | "status">>,
		reviewerRequest: Required<Pick<UserActivityEntity, "userId" | "status">> & RequiredNotNull<Required<Pick<UserActivityEntity, "reviewedByUserId">>>
	) {
		const reviewerUser = await this.utilityService.getUserById(reviewerRequest.reviewedByUserId)

		if (![UserActivityStatus.Approved, UserActivityStatus.Rejected].includes(reviewerRequest.status))
			throw new BadRequestException(
				`Reviewer can only change status to ${UserActivityStatus.Approved} or ${UserActivityStatus.Rejected}`,
				`Reviewer with ID '${reviewerRequest.reviewedByUserId}' can change status only to ${UserActivityStatus.Approved} or ${UserActivityStatus.Rejected}`
			)
		this.validateActivityStatusChange(activity, reviewerRequest)
		if ([UserRole.Admin, UserRole.Owner].includes(reviewerUser.role)) return
		await this.utilityService.isUserSupervisorToEmployee(reviewerUser.id, activity.userId)
	}

	// from PendingApproval -> [ Canceled, Approved, Rejected ]
	// from Approved -> [ Canceled ]
	// from Canceled -> []
	// from Rejected -> []
	// from Assigned -> []
	// from UnAssigned -> []
	validateActivityStatusChange(currentActivity: Required<Pick<UserActivityEntity, "status">>, newActivity: Required<Pick<UserActivityEntity, "status">>): void {
		switch (newActivity.status) {
			case UserActivityStatus.Canceled:
				if (![UserActivityStatus.PendingApproval, UserActivityStatus.Approved].includes(currentActivity.status))
					throw new BadRequestException(`Activity already has final status ${currentActivity.status}`)
				return
			case UserActivityStatus.Approved:
			case UserActivityStatus.Rejected:
				if (![UserActivityStatus.PendingApproval].includes(currentActivity.status))
					throw new BadRequestException(`Activity is not Pending Approval. Current status: ${currentActivity.status}`)
				return
			default:
				throw new BadRequestException(`Activity already has final status ${currentActivity.status}`)
		}
	}
}
