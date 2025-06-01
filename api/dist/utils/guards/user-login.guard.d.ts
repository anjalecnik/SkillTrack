import { CanActivate } from "@nestjs/common";
import { IAuthJwtPassportUserRequest } from "../../modules/auth/interfaces";
declare const UserLoginGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class UserLoginGuard extends UserLoginGuard_base implements CanActivate {
    constructor();
    handleRequest<JWTPassportUser = IAuthJwtPassportUserRequest>(err: unknown, reqUser: JWTPassportUser): JWTPassportUser;
}
export {};
