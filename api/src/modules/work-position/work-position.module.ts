import { Module } from "@nestjs/common"
import { WorkPositionAdminHubController } from "./controllers/work-position.controller"
import { WorkPositionRepository } from "./repository/work-position.repository"
import { WorkPositionService } from "./services/work-position.service"
import { WorkPositionEntity } from "src/libs/db/entities/work-position.entity"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
	imports: [TypeOrmModule.forFeature([WorkPositionEntity])],
	controllers: [WorkPositionAdminHubController],
	providers: [WorkPositionService, WorkPositionRepository],
	exports: [WorkPositionService]
})
export class WorkPositionModule {}
