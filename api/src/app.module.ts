import { Module } from "@nestjs/common"
import { AuthModule } from "./modules/auth/auth.module"
import { TeamModule } from "./modules/team/team.module"
import { UserModule } from "./modules/user/user.module"
import { UtilityModule } from "./modules/utility/utility.module"
import { DbModule } from "./libs/db/db.module"
import { AppConfigModule } from "./config/app-config.module"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { CacheModule } from "@nestjs/cache-manager"
import { WorkPositionModule } from "./modules/work-position/work-position.module"
import { ProjectModule } from "./modules/project/project.module"
import { UserWorkingHoursModule } from "./modules/user/modules/user-working-hours/user-working-hours.module"

@Module({
	imports: [
		EventEmitterModule.forRoot(),
		CacheModule.register({
			isGlobal: true,
			ttl: 5, // seconds
			max: 100 // optional
		}),
		DbModule,
		AppConfigModule,
		AuthModule,
		TeamModule,
		UserModule,
		UtilityModule,
		WorkPositionModule,
		ProjectModule,
		UserWorkingHoursModule
	]
})
export class AppModule {}
