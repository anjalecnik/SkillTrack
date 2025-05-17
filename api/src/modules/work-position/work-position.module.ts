import { Module } from "@nestjs/common"
import { DbModule } from "src/libs/db/db.module"
import { WorkPositionAdminHubController } from "./controllers/work-position.controller"
import { WorkPositionRepository } from "./repository/work-position.repository"
import { WorkPositionService } from "./services/work-position.service"

@Module({
	imports: [DbModule],
	controllers: [WorkPositionAdminHubController],
	providers: [WorkPositionService, WorkPositionRepository],
	exports: []
})
export class WorkPositionModule {}
