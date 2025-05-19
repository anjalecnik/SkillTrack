import { Module } from "@nestjs/common"
import { UserAssignedVacationRepository } from "./repository/user-assigned-vacation.repository"
import { UserAssignedVacationService } from "./services/user-assigned-vacation.service"
import { UserVacationAssignedEntity } from "src/libs/db/entities/user-vacation-assigned.entity"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "src/libs/db/entities/user.entity"

@Module({
	imports: [TypeOrmModule.forFeature([UserVacationAssignedEntity, UserEntity])],
	providers: [UserAssignedVacationService, UserAssignedVacationRepository],
	exports: [UserAssignedVacationService, UserAssignedVacationRepository]
})
export class UserAssignedVacationModule {}
