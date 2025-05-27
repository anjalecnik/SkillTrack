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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_user_google_login_request_1 = require("../dtos/request/auth-user-google-login.request");
const auth_user_refresh_token_request_1 = require("../dtos/request/auth-user-refresh-token.request");
const auth_signed_jwt_response_1 = require("../dtos/response/auth-signed-jwt.response");
const auth_user_service_1 = require("../services/auth-user.service");
const constants_1 = require("../../../utils/constants");
const auth_user_local_signup_request_1 = require("../dtos/request/auth-user-local-signup.request");
const auth_user_local_login_request_1 = require("../dtos/request/auth-user-local-login.request");
let AuthUserController = class AuthUserController {
    authUserService;
    constructor(authUserService) {
        this.authUserService = authUserService;
    }
    async signup(authUserEmailSignupRequest) {
        return this.authUserService.signup(authUserEmailSignupRequest);
    }
    async login(authUserEmailLoginRequest) {
        return this.authUserService.login(authUserEmailLoginRequest);
    }
    async googleLogin(authUserGoogleRequest) {
        return this.authUserService.googleLogin(authUserGoogleRequest);
    }
    async utilizeRefreshToken(refreshTokenData) {
        return this.authUserService.utilizeRefreshToken(refreshTokenData);
    }
};
exports.AuthUserController = AuthUserController;
__decorate([
    (0, common_1.Post)("/sign-up"),
    (0, swagger_1.ApiOperation)({ summary: "Basic Signup" }),
    (0, swagger_1.ApiCreatedResponse)({ description: "Signup", type: auth_signed_jwt_response_1.AuthSignedJwtResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_local_signup_request_1.AuthUserLocalSignupRequest]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)("/login"),
    (0, swagger_1.ApiOperation)({ summary: "Basic Login" }),
    (0, swagger_1.ApiCreatedResponse)({ description: "Login", type: auth_signed_jwt_response_1.AuthSignedJwtResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_local_login_request_1.AuthUserLocalLoginRequest]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("/google/login"),
    (0, swagger_1.ApiOperation)({ summary: "Google Login" }),
    (0, swagger_1.ApiCreatedResponse)({ description: "Google Login", type: auth_signed_jwt_response_1.AuthSignedJwtResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_google_login_request_1.AuthUserGoogleLoginRequest]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Post)("/refresh"),
    (0, swagger_1.ApiOperation)({ summary: "Refresh Token", description: "Refresh Token" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_refresh_token_request_1.AuthUserRefreshTokenRequest]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "utilizeRefreshToken", null);
exports.AuthUserController = AuthUserController = __decorate([
    (0, common_1.Controller)(`${constants_1.ROUTE_AUTH}/${constants_1.ROUTE_USER}`),
    (0, swagger_1.ApiTags)("Auth User"),
    __metadata("design:paramtypes", [auth_user_service_1.AuthUserService])
], AuthUserController);
//# sourceMappingURL=auth-user.controller.js.map