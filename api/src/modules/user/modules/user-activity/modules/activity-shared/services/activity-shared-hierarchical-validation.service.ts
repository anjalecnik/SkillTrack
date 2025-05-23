import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common"
import { IActivitySharedReporterValidation } from "../interfaces"
import { UtilityService } from "src/modules/utility/services/utility.service"
import { originHub } from "src/utils/types/enums/origin-hub.enum"

@Injectable()
export class ActivitySharedHierarchicalValidationService {
	constructor(private readonly utilityService: UtilityService) {}

	/**
	 * @returns returns true if user is Owner/Admin or user's supervisor
	 */
	async validateHierarchicalViolationAndGetIsPrivilege({ userId, reportedByUserId }: IActivitySharedReporterValidation, requestOriginHub: originHub): Promise<boolean> {
		const [user, reportedBy] = await Promise.all([this.utilityService.getUserById(userId), this.utilityService.getUserById(reportedByUserId)])

		const subordinateIds = await this.utilityService.getSubordinateIdsRecursively(reportedBy.id, new Set())

		const isPrivileged = requestOriginHub === originHub.workspaceHub

		// User is self reporting but is not self-manager
		if (user.id === reportedBy.id && !subordinateIds.includes(user.id))
			if (!isPrivileged)
				throw new BadRequestException("Unauthorized self-reporting", `User ID: '${reportedBy.id}' cannot report their own activities unless they are an admin or higher.'`)

		// User is reporting for other user
		if (!subordinateIds.includes(user.id)) {
			// User is reporting for other user. Check supervisor|moderator|admin permissions
			if (!isPrivileged)
				throw new UnauthorizedException(
					"User lacks permissions to report for others",
					`User ID: '${reportedBy.id}' is not authorized to report activities for user ID: '${user.id}'`
				)
		}

		// User from other is reporting for other user
		if (user.id !== reportedBy.id) {
			// Super Admin is reporting for another user. Check super admin permissions
			throw new UnauthorizedException(
				"User lacks permissions to report for others in different workspaces",
				`User ID: '${reportedBy.id}' does not have permission to report activities'`
			)
		}

		return isPrivileged
	}
}
