import { IUserActivityRequestEnriched } from "../../../interfaces/user-activity-request-enriched.interface";
import { ActivityListItemHalBaseResponse } from "../dtos/response/activity-list-item-hal-base.response";
import { ActivityRequestEmbeddedActivityHalBaseResponse } from "../dtos/response/activity-request-embedded-activity-hal-base.response";
import { ActivityRequestEmbeddedHalBaseResponse } from "../dtos/response/activity-request-embedded-hal-base.response";
import { ActivityRequestListItemHalBaseResponse } from "../dtos/response/activity-request-list-item-hal-base.response";
import { IActivitySharedMapperPathParams } from "../interfaces";
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
import { HalResourceResponse, UserShortHalResponse } from "src/utils/types/dtos";
import { UserActivityRequestActions } from "src/utils/types/enums/user-activity-request-actions.enum";
type activityRequestListItemBaseType = "id" | "activityType" | "status" | "reportedByUserId";
type activityListItemBaseType = activityRequestListItemBaseType | "activityRequestId";
type activityRequestEmbeddedActivityBaseType = "id" | "date" | "status";
interface IActivityListItemBase extends Pick<UserActivityEntity, activityListItemBaseType> {
}
interface IActivityListItemBaseResponse extends Pick<ActivityListItemHalBaseResponse, activityListItemBaseType> {
}
interface IActivityRequestListItemBase extends Pick<UserActivityRequestEntity, activityRequestListItemBaseType> {
}
interface IActivityRequestListItemBaseResponse extends Pick<ActivityRequestListItemHalBaseResponse, activityRequestListItemBaseType> {
}
interface IActivityRequestEmbeddedActivityBase extends Pick<UserActivityEntity, activityRequestEmbeddedActivityBaseType> {
}
interface IActivityRequestEmbeddedActivityBaseResponse extends Pick<ActivityRequestEmbeddedActivityHalBaseResponse, activityRequestEmbeddedActivityBaseType> {
}
interface IActivityRequestEmbeddedBaseResponse extends Pick<ActivityRequestEmbeddedHalBaseResponse, "user" | "actions"> {
}
export declare abstract class ActivitySharedHalMapper {
    static mapActivityHalLinks(activity: Pick<UserActivityEntity, "id"> & IActivitySharedMapperPathParams): Pick<HalResourceResponse, "_links">;
    static mapActivityRequestHalLinks(activityRequest: Pick<UserActivityEntity, "id"> & IActivitySharedMapperPathParams): Pick<HalResourceResponse, "_links">;
    static mapActivityListItemBase({ activityRequestId, ...activityRequestListItemBase }: IActivityListItemBase): IActivityListItemBaseResponse;
    static mapActivityRequestListItemBase({ id, activityType, status, reportedByUserId }: IActivityRequestListItemBase): IActivityRequestListItemBaseResponse;
    static mapActivityRequestEmbeddedActivityBase({ id, date, status }: IActivityRequestEmbeddedActivityBase): IActivityRequestEmbeddedActivityBaseResponse;
    static mapActivityRequestEmbeddedBase(activityRequest: IUserActivityRequestEnriched): IActivityRequestEmbeddedBaseResponse;
    static mapActivityRequestEmbeddedUser(activityRequest: UserActivityRequestEntity): UserShortHalResponse;
    static mapActivityRequestEmbeddedActions({ actions }: IUserActivityRequestEnriched): UserActivityRequestActions[];
}
export {};
