import { Module } from "@nestjs/common"
import { ActivitySharedModule } from "../activity-shared/activity-shared.module"
import { ActivityPerformanceReviewService } from "./services/activity-performance-review.service"
import { ActivityPerformanceReviewRepository } from "./repository/activity-performance-review.repository"
import { ActivityPerformanceReviewValidationService } from "./services/activity-performance-review-validation.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"
import { UserPerformanceReviewService } from "../../../user-performance-review/services/user-performance-review.service"
import { UserPerformanceReviewValidationService } from "../../../user-performance-review/services/user-performance-review-validation.service"
import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity"
import { UserPerformanceReviewRepository } from "../../../user-performance-review/repository/user-performance-review.repository"

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, UserActivityEntity, UserActivityRequestEntity, UserPerformanceReviewEntity]), ActivitySharedModule],
	providers: [
		ActivityPerformanceReviewService,
		ActivityPerformanceReviewValidationService,
		ActivityPerformanceReviewRepository,
		MasterDataSource,
		UserPerformanceReviewService,
		UserPerformanceReviewValidationService,
		UserPerformanceReviewRepository
	],
	exports: [ActivityPerformanceReviewService]
})
export class ActivityPerformanceReviewModule {}
