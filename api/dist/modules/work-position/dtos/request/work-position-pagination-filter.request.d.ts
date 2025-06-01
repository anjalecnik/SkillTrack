import { PaginationPropsRequest } from "src/utils/types/dtos";
import { WorkPositionLevel } from "src/utils/types/enums/work-position.enum";
import { ISortingFieldWorkPosition } from "../../interfaces";
export declare class WorkPositionPaginationFilterRequest extends PaginationPropsRequest {
    ids?: number[];
    name?: string;
    levels?: WorkPositionLevel[];
    sort?: ISortingFieldWorkPosition;
}
