import { IUserCommonFilters } from "src/utils/types/interfaces"
import { IUserActivityRequestListFilterDBRequest } from "./db"

export type IUserActivityRequestListFilterRequest = IUserCommonFilters & IUserActivityRequestListFilterDBRequest
