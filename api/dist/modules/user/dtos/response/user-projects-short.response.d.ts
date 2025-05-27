import { ProjectUserRole } from "src/utils/types/enums/project-user-role.enum";
export declare class UserProjectsShortResponse {
    id: number;
    name: string;
    role: ProjectUserRole;
    assignedPercentage: number;
    startDate: string;
    endDate?: string;
}
