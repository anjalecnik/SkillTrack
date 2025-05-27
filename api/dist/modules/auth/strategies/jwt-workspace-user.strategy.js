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
exports.JwtWorkspaceUserStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const auth_mapper_1 = require("../mappers/auth.mapper");
const auth_user_service_1 = require("../services/auth-user.service");
const config_1 = require("../../../utils/config/config");
let JwtWorkspaceUserStrategy = class JwtWorkspaceUserStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "jwtUser") {
    authUserService;
    constructor(authUserService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config_1.Config.get("JWT_SECRET_KEY"),
            passReqToCallback: true
        });
        this.authUserService = authUserService;
    }
    async validate(req, payload) {
        const workspaceId = this.getWorkspaceIdFromRequest(req);
        await this.authUserService.validateIsValidTokenJwtPayload(payload);
        return auth_mapper_1.AuthMapper.mapAuthPassportUserRequestFromPayload(payload);
    }
    getWorkspaceIdFromRequest(req) {
        const params = req.params;
        if (!params)
            throw new common_1.BadRequestException("Invalid request", "Request parameters are missing or undefined");
        return parseInt(params.workspaceId);
    }
};
exports.JwtWorkspaceUserStrategy = JwtWorkspaceUserStrategy;
exports.JwtWorkspaceUserStrategy = JwtWorkspaceUserStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_user_service_1.AuthUserService])
], JwtWorkspaceUserStrategy);
//# sourceMappingURL=jwt-workspace-user.strategy.js.map