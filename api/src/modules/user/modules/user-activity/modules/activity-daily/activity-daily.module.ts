import { Module } from "@nestjs/common"
import { UserWorkingHoursModule } from "../../../user-working-hours/user-working-hours.module"
import { ActivitySharedModule } from "../activity-shared/activity-shared.module"
import { ActivityDailyRepository } from "./repository/activity-daily.repository"
import { ActivityDailyService } from "./services/activity-daily.service"
import { ActivityDailyValidationService } from "./services/activity-daily-validation.service"
import { ActivityLunchModule } from "../activity-lunch/activity-lunch.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"
import { UtilityService } from "src/modules/utility/services/utility.service"
import { UserWorkingHoursEntity } from "src/libs/db/entities/user-working-hours.entity"
import { UserWorkingHoursService } from "../../../user-working-hours/services/user-working-hours.service"
import { UtilityRepository } from "src/modules/utility/repository/utility.repository"
import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { HolidayEntity } from "src/libs/db/entities/holiday.entity"
import { UserAddressEntity } from "src/libs/db/entities/user-address.entity"
import { UserAddressService } from "../../../user-address/services/user-address.service"
import { UserAddressRepository } from "../../../user-address/repository/user-address.repository"

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity, UserActivityEntity, UserActivityRequestEntity, UserWorkingHoursEntity, ProjectEntity, HolidayEntity, UserAddressEntity]),
		ActivitySharedModule,
		UserWorkingHoursModule,
		ActivityLunchModule
	],
	providers: [
		ActivityDailyService,
		ActivityDailyValidationService,
		ActivityDailyRepository,
		MasterDataSource,
		UtilityService,
		UserWorkingHoursService,
		UtilityRepository,
		UserAddressService,
		UserAddressRepository
	],
	exports: [ActivityDailyService]
})
export class ActivityDailyModule {}
