export interface ITransform {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}
export interface IDesk {
  uuid: string;
  name: string;
  isEnabled: boolean;
  isLocked: boolean;
  transform: ITransform;
}
