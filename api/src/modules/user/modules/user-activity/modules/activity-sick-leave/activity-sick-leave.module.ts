import { Module } from "@nestjs/common"
import { ActivitySharedModule } from "../activity-shared/activity-shared.module"
import { ActivitySickLeaveRepository } from "./repository/activity-sick-leave.repository"
import { ActivitySickLeaveService } from "./services/activity-sick-leave.service"
import { ActivitySickLeaveValidationService } from "./services/activity-sick-leave-validation.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, UserActivityEntity, UserActivityRequestEntity]), ActivitySharedModule],
	providers: [ActivitySickLeaveService, ActivitySickLeaveValidationService, ActivitySickLeaveRepository, MasterDataSource],
	exports: [ActivitySickLeaveService]
})
export class ActivitySickLeaveModule {}
