import { IUserCommonFilters } from "src/utils/types/interfaces"
import { IUserActivityRequestPaginationFilterDBRequest } from "./db"

export type IUserActivityRequestListFilterRequest = IUserCommonFilters & IUserActivityRequestPaginationFilterDBRequest
