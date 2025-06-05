import { Module } from "@nestjs/common"
import { ActivityOverviewUserHubController } from "./controllers/activity-overview-user-hub.controller"
import { UserActivityRepository } from "../user/modules/user-activity/repository/user-activity.repository"
import { UserRepository } from "../user/repository/user.repository"
import { ActivityOverviewAdminHubController } from "./controllers/activity-overview-admin-hub.controller"
import { ActivityOverviewRepository } from "./repository/activity-overview.repository"
import { ActivityOverviewService } from "./services/activity-overview.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserPerformanceReviewEntity } from "src/libs/db/entities/user-performance-review.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"
import { UtilityModule } from "../utility/utility.module"
import { ProjectUserEntity } from "src/libs/db/entities/project-user.entity"

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, UserActivityEntity, ProjectUserEntity, UserActivityRequestEntity, UserPerformanceReviewEntity]), UtilityModule],
	controllers: [ActivityOverviewAdminHubController, ActivityOverviewUserHubController],
	providers: [ActivityOverviewService, ActivityOverviewRepository, UserRepository, UserActivityRepository, MasterDataSource]
})
export class ActivityOverviewModule {}
