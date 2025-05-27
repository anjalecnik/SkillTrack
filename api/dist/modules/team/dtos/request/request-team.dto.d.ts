import { PaginationPropsRequest } from "src/utils/types/dtos";
export declare class GetTeamsQuery extends PaginationPropsRequest {
    name?: string;
    sort: SortingField;
    sortingDir: "desc" | "asc";
}
export type SortingField = Omit<"sort" | "sortingDir", keyof GetTeamsQuery> & string;
