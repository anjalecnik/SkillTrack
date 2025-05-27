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
exports.AuthJwtService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_mapper_1 = require("../mappers/auth.mapper");
const config_1 = require("../../../utils/config/config");
let AuthJwtService = class AuthJwtService {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    signAccessJwt(uuid, user) {
        return this.jwtService.sign(auth_mapper_1.AuthMapper.mapSignAuthJwtAccessToken(uuid, user), {
            secret: config_1.Config.get("JWT_SECRET_KEY"),
            expiresIn: config_1.Config.get("JWT_EXPIRE_TIME")
        });
    }
    signRefreshJwt(uuid, user) {
        return this.jwtService.sign(auth_mapper_1.AuthMapper.mapSignAuthJwtRefreshToken(uuid, user), {
            secret: config_1.Config.get("JWT_REFRESH_SECRET_KEY"),
            expiresIn: config_1.Config.get("JWT_REFRESH_EXPIRE_TIME")
        });
    }
    decodeRefreshJwt(token) {
        return this.jwtService.decode(token);
    }
    decodeAuthJwt(token) {
        return this.jwtService.decode(token);
    }
};
exports.AuthJwtService = AuthJwtService;
exports.AuthJwtService = AuthJwtService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthJwtService);
//# sourceMappingURL=auth-jwt.service.js.map