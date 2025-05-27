import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { AppConfigService } from "src/config/app-config.service";
export declare class TypeOrmConfigService implements TypeOrmOptionsFactory {
    private appConfig;
    constructor(appConfig: AppConfigService);
    createTypeOrmOptions(): TypeOrmModuleOptions;
}
