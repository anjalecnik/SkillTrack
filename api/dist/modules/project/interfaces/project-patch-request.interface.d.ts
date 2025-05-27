import { UserRole } from "src/utils/types/enums/user-role.enum";
import { IProjectPatchDBRequest } from "./db";
export type IProjectPatchRequest = IProjectPatchDBRequest & {
    userRole: UserRole;
};
