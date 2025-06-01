import { UserStatus } from "src/utils/types/enums/user-status.enum";
import { UserRole } from "src/utils/types/enums/user-role.enum";
export declare class UserBaseResponse {
    id: number;
    email: string;
    status: UserStatus;
    role: UserRole;
    name: string;
    surname: string;
    birthDate?: string;
    phone?: string;
}
