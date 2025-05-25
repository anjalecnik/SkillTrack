import { Module } from "@nestjs/common"
import { ActivityVirtualService } from "./services/activity-virtual.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserActivityRequestEntity } from "src/libs/db/entities/user-activity-request.entity"
import { UserActivityEntity } from "src/libs/db/entities/user-activity.entity"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { MasterDataSource } from "src/libs/db/master-data-source.service"

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, UserActivityEntity, UserActivityRequestEntity])],
	providers: [ActivityVirtualService, MasterDataSource],
	exports: [ActivityVirtualService]
})
export class ActivityVirtualModule {}
