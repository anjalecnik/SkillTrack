import { UserBaseResponse } from "./user-base.response";
import { UserActivityStatisticResponse } from "./activity/user-activity-statistic.response";
import { UserManagerShortResponse } from "./user-manager-short.response";
import { UserProjectsShortResponse } from "./user-projects-short.response";
import { WorkPositionListItemResponse } from "src/modules/work-position/dtos/response/work-position-list-item.response";
import { UserAddressDetailsResponse } from "../../modules/user-address/dtos/response/user-address-details.response";
import { UserAssignedVacationDetailsResponse } from "../../modules/user-assigned-vacation/dtos/response/user-assigned-vacation-details.response";
export declare class UserDetailsResponse extends UserBaseResponse {
    workPosition?: WorkPositionListItemResponse;
    manager?: UserManagerShortResponse;
    projects?: UserProjectsShortResponse[];
    addresses?: UserAddressDetailsResponse[];
    assignedVacations?: UserAssignedVacationDetailsResponse[];
    activityStatistic: UserActivityStatisticResponse;
    isSupervisor?: boolean;
}
