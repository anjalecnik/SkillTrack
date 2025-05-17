import { UserEntity } from "src/libs/db/entities/user.entity"
import { UserProjectPatchRequest } from "../../dtos/request/patch/user-project-patch.request"
import { UserAddressPatchRequest } from "../../modules/user-address/dtos/request/user-address-patch.request"
import { UserAssignedVacationPatchRequest } from "../../modules/user-assigned-vacation/dtos/request/user-assigned-vacation-patch.request"

export interface IUserPatchDBRequest
	extends Required<Pick<UserEntity, "id" | "updatedByUserId">>,
		Partial<Pick<UserEntity, "name" | "surname" | "birthDate" | "phone" | "workPositionId" | "managerId" | "status">> {
	addresses?: UserAddressPatchRequest[]
	assignedVacations?: UserAssignedVacationPatchRequest[]
	projects?: UserProjectPatchRequest[]
}
