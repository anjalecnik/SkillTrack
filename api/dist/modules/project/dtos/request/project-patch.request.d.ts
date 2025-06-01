import { ProjectType } from "src/utils/types/enums/project.enum";
export declare class ProjectPatchRequest {
    name?: string;
    type?: ProjectType;
    dateStart?: Date;
    dateEnd?: Date | null;
}
