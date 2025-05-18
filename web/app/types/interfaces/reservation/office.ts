import { IDesk, IDrawing } from "~/types";
export interface IFloor {
  name: string;
  desks: IDesk[];
  drawings: IDrawing[];
}

export interface IBuilding {
  name: string;
  address: string;
  floors: IFloor[];
}

export interface IOfficePlan {
  buildings: IBuilding[];
}

export interface IOffice {
  id: number;
  plan: IOfficePlan;
  name: string;
}
