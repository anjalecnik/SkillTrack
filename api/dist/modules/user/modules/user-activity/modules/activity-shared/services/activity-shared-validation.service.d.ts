import { IActivitySharedReporterValidation } from "../interfaces";
import { UtilityService } from "src/modules/utility/services/utility.service";
import { originHub } from "src/utils/types/enums/origin-hub.enum";
import { RequiredNotNull } from "src/utils/types/interfaces";
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity";
export declare class ActivitySharedValidationService {
    private readonly utilityService;
    constructor(utilityService: UtilityService);
    validateWorkspaceViolationAndGetIsPrivilege({ userId, reportedByUserId }: IActivitySharedReporterValidation, requestOriginHub: originHub): Promise<boolean>;
    validateIsWorkingDays(days: Date[]): Promise<void>;
    validateReviewer(activity: Required<Pick<UserActivityEntity, "userId" | "status">>, reviewerRequest: Required<Pick<UserActivityEntity, "userId" | "status">> & RequiredNotNull<Required<Pick<UserActivityEntity, "reviewedByUserId">>>): Promise<void>;
    validateActivityStatusChange(currentActivity: Required<Pick<UserActivityEntity, "status">>, newActivity: Required<Pick<UserActivityEntity, "status">>): void;
}
