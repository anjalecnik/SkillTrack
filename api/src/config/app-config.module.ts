import { ConfigModule } from "@nestjs/config"
import { Module } from "@nestjs/common"
import { AppConfigService } from "./app-config.service"

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" })],
	providers: [AppConfigService],
	exports: [AppConfigService]
})
export class AppConfigModule {}
