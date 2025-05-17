import { Module } from "@nestjs/common"
import { DbModule } from "src/libs/db/db.module"
import { TeamUserHubController } from "./controllers/team-user-hub.controller"
import { TeamRepository } from "./repository/team.repository"
import { TeamService } from "./services/team.service"
import { TeamAdminHubController } from "./controllers/team-admin-hub.controller"

@Module({
	imports: [DbModule],
	controllers: [TeamUserHubController, TeamAdminHubController],
	providers: [TeamService, TeamRepository]
})
export class TeamModule {}
