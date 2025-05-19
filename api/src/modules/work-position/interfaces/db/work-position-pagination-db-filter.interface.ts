import { PaginationPropsRequest } from "src/utils/types/dtos"
import { WorkPositionLevel } from "src/utils/types/enums/work-position.enum"

export const sortingFieldWorkPositionValidationArray = ["id", "name", "level"] as const
export type ISortingFieldWorkPosition = (typeof sortingFieldWorkPositionValidationArray)[number]

export interface IWorkPositionPaginationFilterDBRequest extends PaginationPropsRequest {
	userId: number

	ids?: number[]
	name?: string
	levels?: WorkPositionLevel[]
	sort?: ISortingFieldWorkPosition
}
