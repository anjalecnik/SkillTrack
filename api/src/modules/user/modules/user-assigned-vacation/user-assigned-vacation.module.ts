import { Module } from "@nestjs/common"
import { UserAssignedVacationRepository } from "./repository/user-assigned-vacation.repository"
import { UserAssignedVacationService } from "./services/user-assigned-vacation.service"
import { DbModule } from "src/libs/db/db.module"

@Module({
	imports: [DbModule],
	controllers: [],
	providers: [UserAssignedVacationService, UserAssignedVacationRepository],
	exports: [UserAssignedVacationService]
})
export class UserAssignedVacationModule {}
