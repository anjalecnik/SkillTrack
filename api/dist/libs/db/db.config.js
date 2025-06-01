"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfigService = void 0;
const common_1 = require("@nestjs/common");
const app_config_service_1 = require("../../config/app-config.service");
let TypeOrmConfigService = class TypeOrmConfigService {
    appConfig;
    constructor(appConfig) {
        this.appConfig = appConfig;
    }
    createTypeOrmOptions() {
        return {
            type: "postgres",
            host: this.appConfig.get("POSTGRES_HOST"),
            port: this.appConfig.get("POSTGRES_PORT"),
            username: this.appConfig.get("POSTGRES_USER"),
            password: this.appConfig.get("SECRET_POSTGRES_PASS"),
            database: this.appConfig.get("POSTGRES_DB"),
            entities: [__dirname + "/entities/**/*"],
            migrations: [__dirname + "/migrations/**/*"],
            ssl: false,
            synchronize: false
        };
    }
};
exports.TypeOrmConfigService = TypeOrmConfigService;
exports.TypeOrmConfigService = TypeOrmConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_config_service_1.AppConfigService])
], TypeOrmConfigService);
//# sourceMappingURL=db.config.js.map