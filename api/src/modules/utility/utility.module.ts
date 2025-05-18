import { Module } from "@nestjs/common"
import { UtilityService } from "./services/utility.service"
import { UtilityRepository } from "./repository/utility.repository"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HolidayEntity } from "src/libs/db/entities/holiday.entity"
import { ProjectEntity } from "src/libs/db/entities/project.entity"
import { UserAddressEntity } from "src/libs/db/entities/user-address.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"

/**
 * Part of Global
 * Injected only in @module GlobalModule
 */
@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, ProjectEntity, HolidayEntity, UserAddressEntity])],
	providers: [UtilityService, UtilityRepository],
	exports: [UtilityService]
})
export class UtilityModule {}
