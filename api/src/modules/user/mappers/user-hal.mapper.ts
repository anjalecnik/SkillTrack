import { UserEntity } from "src/libs/db/entities/user.entity"
import { Config } from "src/utils/config/config"
import { ROUTE_USER, ROUTE_WORK_POSITION } from "src/utils/constants"
import { HalHelper } from "src/utils/helpers/hal.helper"
import { UserEmbeddedItemsHalResponse, UserEmbeddedWorkPositionItemsHalResponse, UserShortHalResponse } from "src/utils/types/dtos"

export abstract class UserHalMapper {
	private static composeUserPath(user: UserEntity): string {
		return `${Config.get<string>("APP_API_PREFIX")}/${ROUTE_USER}/${user.id}`
	}
	private static composeUserWorkPositionPath(user: UserEntity): string {
		return `${Config.get<string>("APP_API_PREFIX")}/${ROUTE_USER}/${user.id}/${ROUTE_WORK_POSITION}/${user.workPositionId}`
	}

	/**
	 * @param user UserEntity
	 * @requires UserEntity Relation
	 * @requires WorkPositionEntity Relation
	 */
	static mapHalUserShort(user: UserEntity): UserShortHalResponse {
		const url = this.composeUserPath(user)

		const _embedded = this.mapUserEmbedded(user)

		return {
			id: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			_links: {
				self: HalHelper.halSelf(url)
			},
			_embedded
		}
	}

	private static mapUserEmbedded(user: UserEntity): UserEmbeddedItemsHalResponse | undefined {
		const hasEmbedded = !!user.workPosition
		if (!hasEmbedded) return undefined
		const workPosition = user.workPosition ? this.mapHalUserEmbeddedWorkPositionHal(user) : undefined

		return {
			workPosition
		}
	}

	private static mapHalUserEmbeddedWorkPositionHal(user: UserEntity): UserEmbeddedWorkPositionItemsHalResponse {
		const url = this.composeUserWorkPositionPath(user)
		const { id, name } = user.workPosition!
		return {
			id,
			name,
			_links: {
				self: HalHelper.halSelf(url)
			}
		}
	}
}
