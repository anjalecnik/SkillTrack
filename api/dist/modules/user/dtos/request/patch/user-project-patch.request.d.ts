import { ProjectUserRole } from "src/utils/types/enums/project-user-role.enum";
export declare class UserProjectPatchRequest {
    id: number;
    role: ProjectUserRole;
    assignedPercentage?: number;
}
