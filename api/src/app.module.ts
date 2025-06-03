import { Module } from "@nestjs/common"
import { AuthModule } from "./modules/auth/auth.module"
import { UserModule } from "./modules/user/user.module"
import { UtilityModule } from "./modules/utility/utility.module"
import { DbModule } from "./libs/db/db.module"
import { AppConfigModule } from "./config/app-config.module"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { CacheModule } from "@nestjs/cache-manager"
import { WorkPositionModule } from "./modules/work-position/work-position.module"
import { ProjectModule } from "./modules/project/project.module"
import { UserWorkingHoursModule } from "./modules/user/modules/user-working-hours/user-working-hours.module"
import { JiraModule } from "./modules/jira/jira.module"
import { ActivityOverviewModule } from "./modules/activity-overview/activity-overview.module"
import { MailModule } from "./modules/mail/mail.module"
import { OverviewModule } from "./modules/overview/overview.module"

@Module({
	imports: [
		EventEmitterModule.forRoot(),
		CacheModule.register({
			isGlobal: true,
			ttl: 5,
			max: 100
		}),
		DbModule,
		AppConfigModule,
		MailModule,
		AuthModule,
		UserModule,
		ActivityOverviewModule,
		UtilityModule,
		JiraModule,
		WorkPositionModule,
		ProjectModule,
		UserWorkingHoursModule,
		OverviewModule
	]
})
export class AppModule {}
