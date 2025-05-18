import { Module } from "@nestjs/common"
import { AuthModule } from "./modules/auth/auth.module"
import { TeamModule } from "./modules/team/team.module"
import { UserModule } from "./modules/user/user.module"
import { UtilityModule } from "./modules/utility/utility.module"
import { DbModule } from "./libs/db/db.module"
import { AppConfigModule } from "./config/app-config.module"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { CacheModule } from "@nestjs/cache-manager"

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
		UtilityModule
	]
})
export class AppModule {}
