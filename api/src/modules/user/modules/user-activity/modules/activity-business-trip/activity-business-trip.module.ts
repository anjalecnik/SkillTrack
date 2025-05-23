import { Module } from "@nestjs/common"
import { ActivitySharedModule } from "../activity-shared/activity-shared.module"
import { ActivityBusinessTripRepository } from "./repository/activity-business-trip.repository"
import { ActivityBusinessTripService } from "./services/activity-business-trip.service"
import { ActivityBusinessTripValidationService } from "./services/activity-business-trip-validation.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, UserActivityEntity, UserActivityRequestEntity]), ActivitySharedModule],
	providers: [ActivityBusinessTripService, ActivityBusinessTripValidationService, ActivityBusinessTripRepository, MasterDataSource],
	exports: [ActivityBusinessTripService]
})
export class ActivityBusinessTripModule {}
