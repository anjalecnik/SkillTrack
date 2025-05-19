import { Injectable } from "@nestjs/common"
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm"
import { AppConfigService } from "src/config/app-config.service"

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private appConfig: AppConfigService) {}
	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: "postgres",
			host: this.appConfig.get<string>("POSTGRES_HOST"),
			port: this.appConfig.get<number>("POSTGRES_PORT"),
			username: this.appConfig.get<string>("POSTGRES_USER"),
			password: this.appConfig.get<string>("SECRET_POSTGRES_PASS"),
			database: this.appConfig.get<string>("POSTGRES_DB"),
			entities: [__dirname + "/entities/**/*"],
			migrations: [__dirname + "/migrations/**/*"],
			ssl: false,
			synchronize: false
		}
	}
}
