import { UserRole } from "src/utils/types/enums/user-role.enum";
import { UserStatus } from "src/utils/types/enums/user-status.enum";
export interface IAuthSignJwtUserPayload {
    id: number;
    email: string;
    status: UserStatus;
    role: UserRole;
}
export interface IAuthJwtPayload {
    uuid: string;
    user: IAuthSignJwtUserPayload;
}
