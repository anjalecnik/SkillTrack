import { InternalServerErrorException } from "@nestjs/common"
import { IUserActivityRequestEnriched } from "../../../interfaces/user-activity-request-enriched.interface"
import { ActivityListItemHalBaseResponse } from "../dtos/response/activity-list-item-hal-base.response"
import { ActivityRequestEmbeddedActivityHalBaseResponse } from "../dtos/response/activity-request-embedded-activity-hal-base.response"
import { ActivityRequestEmbeddedHalBaseResponse } from "../dtos/response/activity-request-embedded-hal-base.response"
import { ActivityRequestListItemHalBaseResponse } from "../dtos/response/activity-request-list-item-hal-base.response"
import { IActivitySharedMapperPathParams } from "../interfaces"
import { ROUTE_ACTIVITY, ROUTE_REQUEST, ROUTE_USER } from "src/utils/constants"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { Config } from "src/utils/config/config"
import { DateHelper } from "src/utils/helpers/date.helper"
import { HalHelper } from "src/utils/helpers/hal.helper"
import { HalResourceResponse, UserShortHalResponse } from "src/utils/types/dtos"
import { UserActivityRequestHelper } from "src/utils/helpers/user-activity-request.helper"
import { UserHalMapper } from "src/modules/user/mappers/user-hal.mapper"
import { UserActivityRequestActions } from "src/utils/types/enums/user-activity-request-actions.enum"

type activityRequestListItemBaseType = "id" | "activityType" | "status" | "reportedByUserId"
type activityListItemBaseType = activityRequestListItemBaseType | "activityRequestId"
type activityRequestEmbeddedActivityBaseType = "id" | "date" | "status"

interface IActivityListItemBase extends Pick<UserActivityEntity, activityListItemBaseType> {}
interface IActivityListItemBaseResponse extends Pick<ActivityListItemHalBaseResponse, activityListItemBaseType> {}
interface IActivityRequestListItemBase extends Pick<UserActivityRequestEntity, activityRequestListItemBaseType> {}
interface IActivityRequestListItemBaseResponse extends Pick<ActivityRequestListItemHalBaseResponse, activityRequestListItemBaseType> {}
interface IActivityRequestEmbeddedActivityBase extends Pick<UserActivityEntity, activityRequestEmbeddedActivityBaseType> {}
interface IActivityRequestEmbeddedActivityBaseResponse extends Pick<ActivityRequestEmbeddedActivityHalBaseResponse, activityRequestEmbeddedActivityBaseType> {}
interface IActivityRequestEmbeddedBaseResponse extends Pick<ActivityRequestEmbeddedHalBaseResponse, "user" | "actions"> {}

export abstract class ActivitySharedHalMapper {
	static mapActivityHalLinks(activity: Pick<UserActivityEntity, "id"> & IActivitySharedMapperPathParams): Pick<HalResourceResponse, "_links"> {
		const href = `${Config.get<string>("APP_API_PREFIX")}/${ROUTE_USER}/${activity.userId}/${ROUTE_ACTIVITY}/${activity.id}`
		return {
			_links: {
				self: HalHelper.halSelf(href)
			}
		}
	}

	static mapActivityRequestHalLinks(activityRequest: Pick<UserActivityEntity, "id"> & IActivitySharedMapperPathParams): Pick<HalResourceResponse, "_links"> {
		const href = `${Config.get<string>("APP_API_PREFIX")}/${ROUTE_USER}/${activityRequest.userId}/${ROUTE_ACTIVITY}/${ROUTE_REQUEST}/${activityRequest.id}`
		return {
			_links: {
				self: HalHelper.halSelf(href)
			}
		}
	}

	static mapActivityListItemBase({ activityRequestId, ...activityRequestListItemBase }: IActivityListItemBase): IActivityListItemBaseResponse {
		if (!activityRequestId) {
			throw new InternalServerErrorException(`Activity '${activityRequestListItemBase.id}' property activityRequestId should not be undefined or null`)
		}

		return {
			...ActivitySharedHalMapper.mapActivityRequestListItemBase(activityRequestListItemBase),
			activityRequestId
		}
	}

	static mapActivityRequestListItemBase({ id, activityType, status, reportedByUserId }: IActivityRequestListItemBase): IActivityRequestListItemBaseResponse {
		return {
			id,
			activityType,
			status,
			reportedByUserId
		}
	}

	static mapActivityRequestEmbeddedActivityBase({ id, date, status }: IActivityRequestEmbeddedActivityBase): IActivityRequestEmbeddedActivityBaseResponse {
		return {
			id,
			date: DateHelper.formatIso8601DayString(date),
			status
		}
	}

	static mapActivityRequestEmbeddedBase(activityRequest: IUserActivityRequestEnriched): IActivityRequestEmbeddedBaseResponse {
		return {
			user: ActivitySharedHalMapper.mapActivityRequestEmbeddedUser(activityRequest),
			actions: ActivitySharedHalMapper.mapActivityRequestEmbeddedActions(activityRequest)
		}
	}

	static mapActivityRequestEmbeddedUser(activityRequest: UserActivityRequestEntity): UserShortHalResponse {
		const activityRequestWithUser = UserActivityRequestHelper.validateUserRelation(activityRequest)

		return UserHalMapper.mapHalUserShort(activityRequestWithUser.user)
	}

	static mapActivityRequestEmbeddedActions({ actions }: IUserActivityRequestEnriched): UserActivityRequestActions[] {
		return actions ?? []
	}
}
