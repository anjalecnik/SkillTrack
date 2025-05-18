import { Module } from "@nestjs/common"
import { EmitterModule } from "src/libs/emitters/emitter.module"
import { UserAddressModule } from "./modules/user-address/user-address.module"
import { UserAssignedVacationModule } from "./modules/user-assigned-vacation/user-assigned-vacation.module"
import { UserAdminHubController } from "./controllers/user-admin-hub.controller"
import { UserUserHubController } from "./controllers/user-user-hub.controller"
import { UserRepository } from "./repository/user.repository"
import { UserService } from "./services/user.service"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UtilityModule } from "../utility/utility.module"
import { ProjectUserEntity } from "src/libs/db/entities/project-user.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, ProjectUserEntity]), EmitterModule, UtilityModule, UserAddressModule, UserAssignedVacationModule],
	controllers: [UserUserHubController, UserAdminHubController],
	providers: [UserService, UserRepository, MasterDataSource],
	exports: [UserService]
})
export class UserModule {}
