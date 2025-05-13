import { Module } from "@nestjs/common"
import { DbConfigModule } from "./libs/db/db-config.module"

@Module({
	imports: [DbConfigModule]
})
export class AppModule {}
