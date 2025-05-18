import { Module } from "@nestjs/common"
import { TeamUserHubController } from "./controllers/team-user-hub.controller"
import { TeamRepository } from "./repository/team.repository"
import { TeamService } from "./services/team.service"
import { TeamAdminHubController } from "./controllers/team-admin-hub.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TeamEntity } from "src/libs/db/entities/team.entity"

@Module({
	imports: [TypeOrmModule.forFeature([TeamEntity])],
	controllers: [TeamUserHubController, TeamAdminHubController],
	providers: [TeamService, TeamRepository]
})
export class TeamModule {}
