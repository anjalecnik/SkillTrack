import { ProjectUserRole } from "src/utils/types/enums/project-user-role.enum";
export declare class ProjectParticipantShortResponse {
    id: number;
    name: string;
    surname: string;
    middleName?: string;
    projectRole: ProjectUserRole;
}
