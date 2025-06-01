import { Module } from "@nestjs/common"
import { UserAssignedVacationModule } from "../../../user-assigned-vacation/user-assigned-vacation.module"
import { ActivitySharedModule } from "../activity-shared/activity-shared.module"
import { ActivityVacationRepository } from "./repository/activity-vacation.repository"
import { ActivityVacationService } from "./services/activity-vacation.service"
import { ActivityVacationValidationService } from "./services/activity-vacation-validation.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"
import { MailService } from "src/modules/mail/services/mail.service"

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, UserActivityEntity, UserActivityRequestEntity, UserVacationAssignedEntity]), ActivitySharedModule, UserAssignedVacationModule],
	providers: [ActivityVacationService, ActivityVacationValidationService, ActivityVacationRepository, MasterDataSource, MailService],
	exports: [ActivityVacationService, ActivityVacationValidationService]
})
export class ActivityVacationModule {}
