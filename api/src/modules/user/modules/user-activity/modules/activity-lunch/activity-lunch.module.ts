import { Module } from "@nestjs/common"
import { ActivityLunchService } from "./services/activity-lunch.service"
import { ActivityLunchRepository } from "./repository/activity-lunch.repository"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, UserActivityEntity, UserActivityRequestEntity])],
	providers: [ActivityLunchService, ActivityLunchRepository, MasterDataSource],
	exports: [ActivityLunchService]
})
export class ActivityLunchModule {}
