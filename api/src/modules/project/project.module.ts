import { TypeOrmModule } from "@nestjs/typeorm"
import { Module } from "@nestjs/common"
import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { UserRepository } from "../user/repository/user.repository"
import { ProjectAdminHubController } from "./controllers/project-admin-hub.controller"
import { ProjectUserHubController } from "./controllers/project-user-hub.controller"
import { ProjectRepository } from "./repository/project.repository"
import { ProjectService } from "./services/project.service"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { ProjectUserEntity } from "src/libs/db/entities/project-user.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"

@Module({
	imports: [TypeOrmModule.forFeature([ProjectEntity, UserEntity, ProjectUserEntity, UserActivityEntity])],
	controllers: [ProjectUserHubController, ProjectAdminHubController],
	providers: [ProjectService, ProjectRepository, UserRepository, MasterDataSource],
	exports: [ProjectRepository]
})
export class ProjectModule {}
