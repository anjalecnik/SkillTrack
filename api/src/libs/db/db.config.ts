/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@nestjs/common"
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
	constructor(private configService: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: "postgres",
			host: this.configService.get<string>("POSTGRES_HOST"),
			port: this.configService.get<number>("POSTGRES_PORT"),
			username: this.configService.get<string>("POSTGRES_USER"),
			password: this.configService.get<string>("SECRET_POSTGRES_PASS"),
			database: this.configService.get<string>("POSTGRES_DB"),
			entities: [__dirname + "/entities/**/*{.ts,.js}"],
			migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
			ssl: this.configService.get<boolean>("TYPEORM_USE_SSL") || false,
			retryAttempts: 5,
			autoLoadEntities: false,
			synchronize: false
		}
	}
}
