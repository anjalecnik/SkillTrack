import { Module } from "@nestjs/common"
import { UserPerformanceReviewService } from "./services/user-performance-review.service"
import { UserPerformanceReviewRepository } from "./repository/user-performance-review.repository"
import { UserPerformanceReviewValidationService } from "./services/user-performance-review-validation.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, UserActivityEntity, UserActivityRequestEntity, UserPerformanceReviewEntity])],
	controllers: [],
	providers: [UserPerformanceReviewService, UserPerformanceReviewValidationService, UserPerformanceReviewRepository],
	exports: [UserPerformanceReviewService, UserPerformanceReviewValidationService]
})
export class UserPerformanceReviewModule {}
