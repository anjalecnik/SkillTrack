import { WorkPositionLevel } from "src/utils/types/enums/work-position.enum";
import { WorkPositionPromotionListItemResponse } from "./work-position-promotion-list-item.response";
export declare class WorkPositionListItemResponse {
    id: number;
    name: string;
    level: WorkPositionLevel;
    description: string;
    workPromotion?: WorkPositionPromotionListItemResponse;
}
