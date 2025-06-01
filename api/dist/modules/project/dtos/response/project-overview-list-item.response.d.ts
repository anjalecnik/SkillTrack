import { ProjectStatus } from "src/utils/types/enums/project-status.enum";
import { ProjectParticipantShortResponse } from "./project-participant-short.response";
export declare class ProjectOverviewListItemResponse {
    id: number;
    name: string;
    status?: ProjectStatus;
    dateStart: string;
    dateEnd?: string;
    participants?: ProjectParticipantShortResponse[];
    totalHours?: number;
}
