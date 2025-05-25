import { IUserCommon } from "src/utils/types/interfaces"

export type IActivityLastDailyActivityRequestDBFilter = IUserCommon & {
	date: Date
	hasProject?: boolean
}
