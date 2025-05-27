import { IActivitySharedReporterValidation } from "../interfaces";
import { UtilityService } from "src/modules/utility/services/utility.service";
import { originHub } from "src/utils/types/enums/origin-hub.enum";
export declare class ActivitySharedHierarchicalValidationService {
    private readonly utilityService;
    constructor(utilityService: UtilityService);
    validateHierarchicalViolationAndGetIsPrivilege({ userId, reportedByUserId }: IActivitySharedReporterValidation, requestOriginHub: originHub): Promise<boolean>;
}
