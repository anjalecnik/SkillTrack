import { IUserWithFullName } from "~/util";
import { IPerformanceReview } from "./users-performance-reviews-table";

export interface IUserPerformanceDetails extends IPerformanceReview {
  createdAt: string;
  reportedBy: IUserWithFullName;
}
