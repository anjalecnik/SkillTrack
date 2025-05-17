import { Injectable } from "@nestjs/common"
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm"
import { Config } from "src/utils/config/config"

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: "postgres",
			database: Config.get<string>("POSTGRES_DB"),
			host: Config.get<string>("POSTGRES_HOST"),
			port: Config.get<number>("POSTGRES_PORT"),
			username: Config.get<string>("POSTGRES_USER"),
			password: Config.get<string>("SECRET_POSTGRES_PASS"),
			entities: [`${__dirname}/entities/**/*`],
			migrations: [`${__dirname}/migrations/**/*`],
			ssl: false,
			retryAttempts: 5,
			logging: ["error"],
			autoLoadEntities: false,
			synchronize: false
		}
	}
}
