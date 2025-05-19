import { UserRole } from "src/utils/types/enums/user-role.enum"
import { UserStatus } from "src/utils/types/enums/user-status.enum"

export interface IAuthJwtPassportUserRequest {
	user: IAuthJwtPassportUserDataRequest
}

export interface IAuthJwtPassportUserDataRequest {
	id: number
	email: string
	status: UserStatus
	role: UserRole
}
