import { IUserCommon } from "src/utils/types/interfaces";
export interface IUserActivityCommonParams extends IUserCommon {
    reportedByUserId: number;
}
