import { WorkPositionLevel } from "~/types";

export interface IPositionRequest {
  name: string;
  level: WorkPositionLevel;
  workPositionPromotionId?: number | null;
  description: string;
}
