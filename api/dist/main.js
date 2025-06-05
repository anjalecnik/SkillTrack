"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("./utils/config/config");
const swagger_config_1 = require("./utils/swagger.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
    const appPort = config_1.Config.get("APP_PORT");
    const appHostname = config_1.Config.get("APP_HOST");
    const apiPrefix = config_1.Config.get("GLOBAL_PREFIX");
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    app.setGlobalPrefix(apiPrefix);
    app.enableCors({
        origin: config_1.Config.get("APP_CORS_ORIGIN"),
        methods: config_1.Config.get("APP_CORS_METHODS")
    });
    swagger_config_1.SwaggerConfig.setupSwagger(app);
    await app.listen(appPort, appHostname);
}
bootstrap().catch((error) => console.error(`ERROR: Can't start: ${error.message}`));
//# sourceMappingURL=main.js.map