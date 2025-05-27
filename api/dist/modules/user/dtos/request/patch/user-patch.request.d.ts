import { UserStatus } from "src/utils/types/enums/user-status.enum";
import { UserProjectPatchRequest } from "./user-project-patch.request";
import { UserAddressPatchRequest } from "src/modules/user/modules/user-address/dtos/request/user-address-patch.request";
import { UserAssignedVacationPatchRequest } from "src/modules/user/modules/user-assigned-vacation/dtos/request/user-assigned-vacation-patch.request";
export declare class UserPatchRequest {
    name?: string;
    surname?: string;
    birthDate?: Date;
    phone?: string;
    teamId?: number;
    workPositionId?: number;
    managerId?: number;
    addresses?: UserAddressPatchRequest[];
    projects?: UserProjectPatchRequest[];
    assignedVacations?: UserAssignedVacationPatchRequest[];
    status?: UserStatus;
}
