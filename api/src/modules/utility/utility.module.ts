import { Module } from "@nestjs/common"
import { DbModule } from "src/libs/db/db.module"
import { UtilityService } from "./services/utility.service"
import { UtilityRepository } from "./repository/utility.repository"

/**
 * Part of Global
 * Injected only in @module GlobalModule
 */
@Module({
	imports: [DbModule],
	providers: [UtilityService, UtilityRepository],
	exports: [UtilityService]
})
export class UtilityModule {}
