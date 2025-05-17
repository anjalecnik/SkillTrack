import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity"
import { UserAssignedVacationDetailsResponse } from "../dtos/response/user-assigned-vacation-details.response"

export abstract class UserAssignedVacationMapper {
	static mapUserAssignedVacationDetails(assignedVacation: UserVacationAssignedEntity): UserAssignedVacationDetailsResponse {
		return {
			id: assignedVacation.id,
			year: assignedVacation.year,
			assignedDays: assignedVacation.assignedDays ?? undefined,
			oldVacationExpiration: assignedVacation.oldVacationExpiration ?? undefined,
			initialUsedDays: assignedVacation.initialUsedDays ?? undefined,
			initialDate: assignedVacation.initialDate ?? undefined,
			description: assignedVacation.description ?? undefined
		}
	}
}
