import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TypeOrmConfig } from "./db.config"

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfig
		})
	]
})
export class DbConfigModule {}
