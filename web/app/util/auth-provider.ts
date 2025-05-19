import { IProvidedUser } from "~/types";

export interface IAuthProvider {
  login(): Promise<string | null>;
  logout(): Promise<void>;
  getUser(): IProvidedUser | null;
}
