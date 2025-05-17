import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HolidayEntity } from "./entities/holiday.entity"
import { ProjectUserEntity } from "./entities/project-user.entity"
import { ProjectEntity } from "./entities/project.entity"
import { TeamEntity } from "./entities/team.entity"
import { UserAddressEntity } from "./entities/user-address.entity"
import { UserVacationAssignedEntity } from "./entities/user-vacation-assigned.entity"
import { UserEntity } from "./entities/user.entity"
import { WorkPositionEntity } from "./entities/work-position.entity"
import { MasterDataSource } from "./master-data-source.service"

@Module({
	imports: [TypeOrmModule.forFeature([HolidayEntity, ProjectEntity, UserAddressEntity, UserEntity, TeamEntity, WorkPositionEntity, ProjectUserEntity, UserVacationAssignedEntity])],
	providers: [MasterDataSource],
	exports: [MasterDataSource, TypeOrmModule]
})
export class DbModule {}
