"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const google_auth_library_1 = require("google-auth-library");
const auth_user_controller_1 = require("./controllers/auth-user.controller");
const auth_repository_1 = require("./repository/auth.repository");
const auth_jwt_service_1 = require("./services/auth-jwt.service");
const auth_token_listener_service_1 = require("./services/auth-token-listener.service");
const auth_user_service_1 = require("./services/auth-user.service");
const jwt_workspace_user_strategy_1 = require("./strategies/jwt-workspace-user.strategy");
const config_1 = require("../../utils/config/config");
const cache_manager_1 = require("@nestjs/cache-manager");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../libs/db/entities/user.entity");
const jwt_user_login_strategy_1 = require("./strategies/jwt-user-login.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            jwt_1.JwtModule.register({
                secret: config_1.Config.get("JWT_SECRET_KEY"),
                signOptions: { expiresIn: config_1.Config.get("JWT_EXPIRE_TIME") }
            }),
            cache_manager_1.CacheModule.register(),
            passport_1.PassportModule
        ],
        controllers: [auth_user_controller_1.AuthUserController],
        providers: [auth_jwt_service_1.AuthJwtService, auth_user_service_1.AuthUserService, auth_token_listener_service_1.AuthTokenListenerService, jwt_user_login_strategy_1.JwtUserLoginStrategy, jwt_workspace_user_strategy_1.JwtWorkspaceUserStrategy, google_auth_library_1.OAuth2Client, auth_repository_1.AuthRepository],
        exports: []
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map