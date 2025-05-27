import { WorkPositionLevel } from "src/utils/types/enums/work-position.enum";
export declare class WorkPositionPatchRequest {
    name?: string;
    level?: WorkPositionLevel;
    workPositionPromotionId?: number;
    description?: string;
}
