import { CanActivate, Type } from "@nestjs/common";
import { UserRole } from "../types/enums/user-role.enum";
export declare function UserGuard(...roles: UserRole[]): Type<CanActivate>;
