import { CanActivate, ExecutionContext } from "@nestjs/common";
import { UtilityService } from "src/modules/utility/services/utility.service";
declare const UserManagerGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class UserManagerGuard extends UserManagerGuard_base implements CanActivate {
    private readonly utilityService;
    constructor(utilityService: UtilityService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
