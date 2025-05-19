import { UserEntity } from "../../../libs/db/entities/user.entity"
import { IAuthJwtPassportUserDataRequest, IAuthJwtPassportUserRequest, IAuthJwtPayload, IAuthJwtRefreshPayload, IAuthSignJwtUserPayload } from "../interfaces"

export abstract class AuthMapper {
	// Map JWT token
	static mapSignAuthJwtAccessToken(uuid: string, user: UserEntity): IAuthJwtPayload {
		return {
			uuid: uuid,
			user: {
				id: user.id,
				email: user.email,
				role: user.role,
				status: user.status
			}
		}
	}

	static mapSignAuthJwtRefreshToken(uuid: string, user: UserEntity): IAuthJwtRefreshPayload {
		return {
			uuid: uuid,
			userId: user.id
		}
	}

	//#region Map User in Passport req.user
	static mapAuthPassportUserRequestFromPayload(payload: IAuthJwtPayload): IAuthJwtPassportUserRequest {
		return {
			user: {
				email: payload.user.email,
				id: payload.user.id,
				status: payload.user.status,
				role: payload.user.role
			}
		}
	}
	//#endregion Map User in Passport req.user

	//#region Map User in Passport req.user

	static mapUserAccount(user: IAuthSignJwtUserPayload): IAuthJwtPassportUserDataRequest {
		return {
			id: user.id,
			email: user.email,
			role: user.role,
			status: user.status
		}
	}
	//#endregion Map WorkspaceUser in Passport req.user
}
