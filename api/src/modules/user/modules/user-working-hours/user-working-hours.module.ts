import { Module } from "@nestjs/common"
import { UserWorkingHoursService } from "./services/user-working-hours.service"
import { ActivitySharedModule } from "../user-activity/modules/activity-shared/activity-shared.module"
import { ActivityDailyRepository } from "../user-activity/modules/activity-daily/repository/activity-daily.repository"
import { ActivityLunchModule } from "../user-activity/modules/activity-lunch/activity-lunch.module"
import { ActivityDailyValidationService } from "../user-activity/modules/activity-daily/services/activity-daily-validation.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, UserActivityEntity, UserActivityRequestEntity, UserWorkingHoursEntity]), ActivitySharedModule, ActivityLunchModule],
	controllers: [],
	providers: [UserWorkingHoursService, ActivityDailyRepository, ActivityDailyValidationService, UserWorkingHoursService, MasterDataSource],
	exports: [UserWorkingHoursService]
})
export class UserWorkingHoursModule {}
