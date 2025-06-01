import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity";
import { UserEntity } from "src/libs/db/entities/user.entity";
import { UtilityService } from "src/modules/utility/services/utility.service";
import { UserActivityRequestActions } from "src/utils/types/enums/user-activity-request-actions.enum";
type IUserActionType = "Admin" | "SelfSuperior" | "RegularUser" | "Reviewer" | "None";
export declare class ActivitySharedRequestActionsService {
    private readonly utilityService;
    constructor(utilityService: UtilityService);
    private getUserTypeSelf;
    private getUserTypeForRequest;
    getUserType(userInvoker: number | UserEntity, activityRequest: Pick<UserActivityRequestEntity, "userId" | "activityType">, subordinateIds: number[]): Promise<IUserActionType>;
    getActivityRequestActions(userInvoker: number | UserEntity, activityRequest: Pick<UserActivityRequestEntity, "userId" | "activityType" | "status">, subordinateIds: number[]): Promise<UserActivityRequestActions[]>;
}
export {};
