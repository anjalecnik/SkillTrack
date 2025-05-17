import { Module } from "@nestjs/common"
import { DbModule } from "src/libs/db/db.module"
import { EmitterModule } from "src/libs/emitters/emitter.module"
import { UserAddressModule } from "./modules/user-address/user-address.module"
import { UserAssignedVacationModule } from "./modules/user-assigned-vacation/user-assigned-vacation.module"
import { UserAdminHubController } from "./controllers/user-admin-hub.controller"
import { UserUserHubController } from "./controllers/user-user-hub.controller"
import { UserRepository } from "./repository/user.repository"
import { UserService } from "./services/user.service"

@Module({
	imports: [DbModule, EmitterModule, UserAddressModule, UserAssignedVacationModule],
	controllers: [UserUserHubController, UserAdminHubController],
	providers: [UserService, UserRepository],
	exports: [UserService]
})
export class UserModule {}
