import { Strategy } from "passport-jwt";
import { AuthUserService } from "../services/auth-user.service";
import { IAuthJwtPassportUserRequest, IAuthJwtPayload } from "../interfaces";
declare const JwtWorkspaceUserStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtWorkspaceUserStrategy extends JwtWorkspaceUserStrategy_base {
    private readonly authUserService;
    constructor(authUserService: AuthUserService);
    validate(req: Request, payload: IAuthJwtPayload): Promise<IAuthJwtPassportUserRequest>;
    private getWorkspaceIdFromRequest;
}
export {};
