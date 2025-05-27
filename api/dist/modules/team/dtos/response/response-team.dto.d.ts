import { PaginatedMetaResponse } from "src/utils/types/dtos";
import { TeamDto } from "../team.dto";
export declare class TeamListDto {
    meta: PaginatedMetaResponse;
    data: TeamDto[];
}
