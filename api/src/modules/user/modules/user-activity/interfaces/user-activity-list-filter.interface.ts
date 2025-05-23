import { IUserCommon } from "src/utils/types/interfaces"
import { IUserActivityListFilterDBRequest } from "./db/user-activity-list-filter-db.interface"

export type IUserActivityListFilterRequest = IUserCommon & IUserActivityListFilterDBRequest
