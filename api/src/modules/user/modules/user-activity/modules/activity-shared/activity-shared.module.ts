import { Module } from "@nestjs/common"
import { ActivitySharedRepository } from "./repository/activity-shared.repository"
import { ActivitySharedService } from "./services/activity-shared.service"
import { ActivitySharedRequestActionsService } from "./services/activity-shared-request-actions.service"
import { ActivitySharedValidationService } from "./services/activity-shared-validation.service"
import { ActivitySharedValidationCollisionService } from "./services/activity-shared-validation-collision.service"
import { ActivitySharedHierarchicalValidationService } from "./services/activity-shared-hierarchical-validation.service"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UtilityService } from "src/modules/utility/services/utility.service"
import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { HolidayEntity } from "src/libs/db/entities/holiday.entity"
import { UtilityRepository } from "src/modules/utility/repository/utility.repository"
import { UserAddressRepository } from "../../../user-address/repository/user-address.repository"
import { UserAddressEntity } from "src/libs/db/entities/user-address.entity"
import { UserAddressService } from "../../../user-address/services/user-address.service"
import { MasterDataSource } from "src/libs/db/master-data-source.service"

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, UserActivityEntity, UserActivityRequestEntity, ProjectEntity, HolidayEntity, UserAddressEntity])],
	providers: [
		ActivitySharedService,
		ActivitySharedValidationService,
		ActivitySharedValidationCollisionService,
		ActivitySharedHierarchicalValidationService,
		ActivitySharedRequestActionsService,
		ActivitySharedRepository,
		UtilityService,
		UtilityRepository,
		UserAddressRepository,
		UserAddressService,
		MasterDataSource
	],
	exports: [
		ActivitySharedService,
		ActivitySharedValidationService,
		ActivitySharedValidationCollisionService,
		ActivitySharedHierarchicalValidationService,
		ActivitySharedRequestActionsService
	]
})
export class ActivitySharedModule {}
