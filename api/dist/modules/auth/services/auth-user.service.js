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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const google_auth_library_1 = require("google-auth-library");
const lodash_1 = __importDefault(require("lodash"));
const ms_1 = __importDefault(require("ms"));
const uuid_1 = require("uuid");
const auth_repository_1 = require("../repository/auth.repository");
const auth_jwt_service_1 = require("./auth-jwt.service");
const config_1 = require("../../../utils/config/config");
const cache_helper_1 = require("../../../utils/helpers/cache.helper");
const password_helper_1 = require("../../../utils/helpers/password.helper");
let AuthUserService = class AuthUserService {
    cacheManager;
    authRepository;
    authJwtService;
    googleAuth = new google_auth_library_1.OAuth2Client({
        clientId: config_1.Config.get("GOOGLE_CLIENT_ID"),
        clientSecret: config_1.Config.get("GOOGLE_CLIENT_SECRET")
    });
    constructor(cacheManager, authRepository, authJwtService) {
        this.cacheManager = cacheManager;
        this.authRepository = authRepository;
        this.authJwtService = authJwtService;
    }
    async googleLogin({ idToken }) {
        const authResponse = await this.googleAuth.verifyIdToken({ idToken }).catch(() => {
            throw new common_1.UnauthorizedException("Invalid google  idToken");
        });
        const payload = authResponse.getPayload();
        if (!payload || !payload.email)
            throw new common_1.UnauthorizedException(`Something went wrong, please try again later`);
        const user = await this.authRepository.getOrCreateUserByEmail(payload.email);
        return this.createTokenPair(user);
    }
    async utilizeRefreshToken({ refreshToken }) {
        const refreshTokenDecoded = this.authJwtService.decodeRefreshJwt(refreshToken);
        if (!refreshTokenDecoded)
            throw new common_1.UnauthorizedException("Invalid refresh token");
        if (!refreshTokenDecoded.userId && !refreshTokenDecoded.uuid)
            throw new common_1.UnauthorizedException("Invalid refresh token", "Refresh token is missing required fields (userId or UUID)");
        const cachedToken = await this.cacheManager.get(`${cache_helper_1.CacheHelper.getPathJwtRefreshToken(refreshTokenDecoded.userId, refreshTokenDecoded.uuid)}`);
        if (!cachedToken)
            throw new common_1.UnauthorizedException("Invalid or expired refresh token", `No cached token found for user ID: '${refreshTokenDecoded.userId}' and UUID:'${refreshTokenDecoded.uuid}'`);
        const userEntity = await this.authRepository.getUserById(refreshTokenDecoded.userId);
        if (!userEntity)
            throw new common_1.UnauthorizedException("User account not found", `No user found with ID: '${refreshTokenDecoded.userId}'`);
        await cache_helper_1.CacheHelper.invalidateRefreshToken(this.cacheManager, refreshTokenDecoded.userId, refreshTokenDecoded.uuid);
        await cache_helper_1.CacheHelper.invalidateAccessToken(this.cacheManager, refreshTokenDecoded.userId, refreshTokenDecoded.uuid);
        return this.createTokenPair(userEntity);
    }
    async validateIsValidTokenJwtPayload(payload) {
        if (!payload?.user?.email)
            throw new common_1.UnauthorizedException("User is not logged in", "User email missing from JWT payload");
        if (!payload?.uuid)
            throw new common_1.UnauthorizedException("Invalid authentication token", "UUID missing from JWT payload");
        const savedToken = await this.cacheManager.get(cache_helper_1.CacheHelper.getPathJwtAccessToken(payload.user.id, payload.uuid));
        if (!savedToken)
            throw new common_1.UnauthorizedException("Authentication session expired", `No saved token found for user ID: '${payload.user.id}'`);
        if (!lodash_1.default.isEqual(this.authJwtService.decodeAuthJwt(savedToken), payload))
            throw new common_1.UnauthorizedException("Invalid authentication token", "Mismatch between saved token data and provided payload");
    }
    async signup({ email, password }) {
        const existingUser = await this.authRepository.getUserByEmail(email);
        if (existingUser)
            throw new Error("User with provided email already exists");
        const hashPassword = await password_helper_1.PasswordHelper.hashPassword(password);
        const user = await this.authRepository.createUser({ email, password: hashPassword });
        return this.createTokenPair(user);
    }
    async login({ email, password }) {
        const user = await this.authRepository.getUserByEmail(email);
        if (!user)
            throw new common_1.BadRequestException("Invalid email or password");
        if (!user?.password || !(await password_helper_1.PasswordHelper.verifyPassword(password, user.password)))
            throw new common_1.BadRequestException("Invalid email or password");
        return this.createTokenPair(user);
    }
    async createTokenPair(user) {
        const uuid = (0, uuid_1.v4)();
        const accessToken = this.authJwtService.signAccessJwt(uuid, user);
        const refreshToken = this.authJwtService.signRefreshJwt(uuid, user);
        const rawAccessTtl = config_1.Config.get("JWT_EXPIRE_TIME") ?? "7d";
        const rawRefreshTtl = config_1.Config.get("JWT_REFRESH_EXPIRE_TIME") ?? "30d";
        function parseMsSafe(input, fallback) {
            const parsed = (0, ms_1.default)(input ?? fallback);
            if (typeof parsed !== "number") {
                throw new Error(`Invalid ms value: '${input}'`);
            }
            return parsed;
        }
        const accessTokenTTL = parseMsSafe(rawAccessTtl, "7d");
        const refreshTokenTTL = parseMsSafe(rawRefreshTtl, "30d");
        if (typeof accessTokenTTL !== "number" || typeof refreshTokenTTL !== "number") {
            throw new Error("Invalid TTL format");
        }
        await this.cacheManager.set(cache_helper_1.CacheHelper.getPathJwtAccessToken(user.id, uuid), accessToken, {
            ttl: accessTokenTTL / 1000
        });
        await this.cacheManager.set(cache_helper_1.CacheHelper.getPathJwtRefreshToken(user.id, uuid), refreshToken, {
            ttl: refreshTokenTTL / 1000
        });
        return {
            accessToken,
            refreshToken
        };
    }
};
exports.AuthUserService = AuthUserService;
exports.AuthUserService = AuthUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, auth_repository_1.AuthRepository, auth_jwt_service_1.AuthJwtService])
], AuthUserService);
//# sourceMappingURL=auth-user.service.js.map