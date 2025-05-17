import { Module } from "@nestjs/common"
import { DbConfigModule } from "./libs/db/db-config.module"
import { AuthModule } from "./modules/auth/auth.module"
import { TeamModule } from "./modules/team/team.module"
import { UserModule } from "./modules/user/user.module"
import { UtilityModule } from "./modules/utility/utility.module"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Config } from "./utils/config/config"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ".env"
		}),
		TypeOrmModule.forRoot({
			type: "postgres",
			host: Config.get<string>("POSTGRES_HOST"),
			port: Config.get<number>("POSTGRES_PORT"),
			username: Config.get<string>("POSTGRES_USER"),
			password: Config.get<string>("SECRET_POSTGRES_PASS"),
			database: Config.get<string>("POSTGRES_DB"),
			entities: [`${__dirname}/entities/**/*`],
			migrations: [`${__dirname}/migrations/**/*`],
			ssl: false,
			synchronize: false
		}),
		DbConfigModule,
		AuthModule,
		TeamModule,
		UserModule,
		UtilityModule
	]
})
export class AppModule {}
