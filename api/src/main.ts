import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { Config } from "./utils/config/config"
import { SwaggerConfig } from "./utils/swagger.config"

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule, {})

	const appPort: number = Config.get<number>("APP_PORT")
	const appHostname: string = Config.get<string>("APP_HOST")
	const apiPrefix: string = Config.get<string>("GLOBAL_PREFIX")

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true
		})
	)
	app.setGlobalPrefix(apiPrefix)
	app.enableCors({
		origin: Config.get<string[]>("APP_CORS_ORIGIN"),
		methods: Config.get<string[]>("APP_CORS_METHODS")
	})

	SwaggerConfig.setupSwagger(app)

	await app.listen(appPort, appHostname)
}
bootstrap().catch((error: Error) => console.error(`ERROR: Can't start: ${error.message}`))
