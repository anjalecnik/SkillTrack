import { WorkPositionLevel } from "src/utils/types/enums/work-position.enum";
export declare class WorkPositionCreateRequest {
    name: string;
    level: WorkPositionLevel;
    workPositionPromotionId?: number;
    description: string;
}
