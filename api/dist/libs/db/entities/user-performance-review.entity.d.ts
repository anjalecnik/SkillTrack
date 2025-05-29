import { ICreatedAtEntity, IUpdatedAtEntity } from "./interfaces/date.interface.entity";
import { UserPerformanceReviewQuartal } from "../../../utils/types/enums/user-performance-review-quartal.enum";
import { UserEntity } from "./user.entity";
import { UserActivityEntity } from "./user-activity.entity";
export declare class UserPerformanceReviewEntity implements ICreatedAtEntity, IUpdatedAtEntity {
    id: number;
    answer1: number;
    answer2: number;
    answer3: boolean;
    answer4: boolean;
    quartal: UserPerformanceReviewQuartal;
    year: number;
    score: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    user?: UserEntity;
    activities: UserActivityEntity[];
}
