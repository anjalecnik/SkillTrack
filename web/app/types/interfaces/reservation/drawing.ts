import { DrawingType } from "~/types";

export interface IRectangle {
  width: number;
  height: number;
}

export interface ICircle {
  radius: number;
}

export interface ILine {
  points: number[];
}

export interface IText {
  text: string;
}

export type IDrawingShape = IRectangle | ICircle | ILine | IText;
export interface IDrawing {
  uuid: string;
  type: DrawingType;
  drawing: IDrawingShape;
  x: number;
  y: number;
}
