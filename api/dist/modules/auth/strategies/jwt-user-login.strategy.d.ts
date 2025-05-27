import { Strategy } from "passport-jwt";
import { IAuthJwtPassportUserRequest, IAuthJwtPayload } from "../interfaces";
import { AuthUserService } from "../services/auth-user.service";
declare const JwtUserLoginStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtUserLoginStrategy extends JwtUserLoginStrategy_base {
    private readonly authUserService;
    constructor(authUserService: AuthUserService);
    validate(payload: IAuthJwtPayload): Promise<IAuthJwtPassportUserRequest>;
}
export {};
