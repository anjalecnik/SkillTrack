import { Module, ValidationPipe } from "@nestjs/common"
import { AdminHubActivityController } from "../controllers/admin-hub-activity.controller"
import { UserHubActivityController } from "../controllers/user-hub-activity.controller"
import { UserActivityRepository } from "../repository/user-activity.repository"
import { UserActivityFactoryWorkerService } from "../services/user-activity-factory-worker.service"
import { UserActivityService } from "../services/user-activity.service"
import { ActivityBusinessTripModule } from "./activity-business-trip/activity-business-trip.module"
import { ActivityDailyModule } from "./activity-daily/activity-daily.module"
import { ActivityPerformanceReviewModule } from "./activity-performance-review/activity-performance-review.module"
import { ActivitySharedModule } from "./activity-shared/activity-shared.module"
import { ActivitySickLeaveModule } from "./activity-sick-leave/activity-sick-leave.module"
import { ActivityVacationModule } from "./activity-vacation/activity-vacation.module"
import { ActivityVirtualModule } from "./activity-virtual/activity-virtual.module"
import { MasterDataSource } from "src/libs/db/master-data-source.service"
import { UtilityService } from "src/modules/utility/services/utility.service"
import { UtilityRepository } from "src/modules/utility/repository/utility.repository"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HolidayEntity } from "src/libs/db/entities/holiday.entity"
import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserAddressEntity } from "src/libs/db/entities/user-address.entity"
import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { NotificationEntity } from "src/libs/db/entities/notification.entity"
@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserEntity,
			UserActivityEntity,
			UserActivityRequestEntity,
			UserWorkingHoursEntity,
			ProjectEntity,
			HolidayEntity,
			UserAddressEntity,
			NotificationEntity
		]),
		ActivitySharedModule,
		ActivityDailyModule,
		ActivityBusinessTripModule,
		ActivityVacationModule,
		ActivitySickLeaveModule,
		ActivityVirtualModule,
		ActivityPerformanceReviewModule
	],
	controllers: [AdminHubActivityController, UserHubActivityController],
	providers: [UserActivityService, UserActivityFactoryWorkerService, UserActivityRepository, MasterDataSource, UtilityService, UtilityRepository, ValidationPipe],
	exports: [UserActivityService]
})
export class UserActivityModule {}
