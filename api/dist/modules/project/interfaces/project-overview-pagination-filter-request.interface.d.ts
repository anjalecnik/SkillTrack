import { UserRole } from "src/utils/types/enums/user-role.enum";
import { IProjectOverviewPaginationFilterDBRequest } from "./db";
export type IProjectOverviewPaginationFilterRequest = IProjectOverviewPaginationFilterDBRequest & {
    userRole: UserRole;
};
