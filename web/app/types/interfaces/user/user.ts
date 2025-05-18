import { IPositionResponse } from "~/types";

export interface IUser {
  id: number;
  name: string;
  surname: string;
  middleName?: string;
  email: string;
  picture?: string;
}
export interface IProvidedUser {
  email: string;
  name: string;
  picture: string;
}

export interface IOwner {
  name: string;
  surname: string;
}

export interface IActivitiesUser extends IUser {
  _embedded?: {
    workPosition?: IPositionResponse;
  };
}
