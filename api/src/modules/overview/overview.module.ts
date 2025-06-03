import { Module } from "@nestjs/common"
import { EmitterModule } from "src/libs/emitters/emitter.module"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UtilityModule } from "../utility/utility.module"
import { MasterDataSource } from "src/libs/db/master-data-source.service"
import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { WorkPositionEntity } from "src/libs/db/entities/work-position.entity"
import { OverviewAdminHubController } from "./controllers/overview-admin-hub.controller"
import { OverviewService } from "./services/overview.service"
import { UserRepository } from "../user/repository/user.repository"
import { JiraService } from "../jira/services/jira.service"
import { WorkPositionRepository } from "../work-position/repository/work-position.repository"
import { ProjectRepository } from "../project/repository/project.repository"
import { ProjectUserEntity } from "src/libs/db/entities/project-user.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserActivityRepository } from "../user/modules/user-activity/repository/user-activity.repository"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { NotificationEntity } from "src/libs/db/entities/notification.entity"

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity, ProjectEntity, WorkPositionEntity, ProjectUserEntity, UserActivityEntity, UserActivityRequestEntity, NotificationEntity]),
		EmitterModule,
		UtilityModule
	],
	controllers: [OverviewAdminHubController],
	providers: [OverviewService, MasterDataSource, UserRepository, JiraService, WorkPositionRepository, ProjectRepository, UserActivityRepository],
	exports: [OverviewService]
})
export class OverviewModule {}
