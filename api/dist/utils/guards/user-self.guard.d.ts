import { CanActivate, ExecutionContext } from "@nestjs/common";
declare const UserSelfGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class UserSelfGuard extends UserSelfGuard_base implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
