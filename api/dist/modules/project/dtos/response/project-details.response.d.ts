import { ProjectStatus } from "src/utils/types/enums/project-status.enum";
import { ProjectType } from "src/utils/types/enums/project.enum";
import { ProjectParticipantShortResponse } from "./project-participant-short.response";
export declare class ProjectDetailsResponse {
    id: number;
    name: string;
    status: ProjectStatus;
    type?: ProjectType;
    dateStart: string;
    dateEnd?: string;
    participants?: ProjectParticipantShortResponse[];
    totalHours: number;
    totalDays: number;
}
