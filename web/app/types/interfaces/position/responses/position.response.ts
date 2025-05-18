import { WorkPositionLevel } from "~/types";

export interface IPositionResponse {
  id: number;
  name: string;
  level: WorkPositionLevel;
  workPromotion?: {
    id: number;
    name: string;
  };
  description: string;
}
