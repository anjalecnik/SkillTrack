import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HolidayEntity } from "./entities/holiday.entity"
import { ProjectUserEntity } from "./entities/project-user.entity"
import { ProjectEntity } from "./entities/project.entity"
import { UserAddressEntity } from "./entities/user-address.entity"
import { UserVacationAssignedEntity } from "./entities/user-vacation-assigned.entity"
import { UserEntity } from "./entities/user.entity"
import { WorkPositionEntity } from "./entities/work-position.entity"
import { AppConfigModule } from "src/config/app-config.module"
import { TypeOrmConfigService } from "./db.config"

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [AppConfigModule],
			useClass: TypeOrmConfigService
		}),
		TypeOrmModule.forFeature([HolidayEntity, ProjectUserEntity, ProjectEntity, UserAddressEntity, UserVacationAssignedEntity, UserEntity, WorkPositionEntity])
	]
})
export class DbModule {}
