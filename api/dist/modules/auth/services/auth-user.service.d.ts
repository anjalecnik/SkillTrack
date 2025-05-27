import type { Cache } from "cache-manager";
import { AuthUserGoogleLoginRequest } from "../dtos/request/auth-user-google-login.request";
import { AuthUserRefreshTokenRequest } from "../dtos/request/auth-user-refresh-token.request";
import { AuthSignedJwtResponse } from "../dtos/response/auth-signed-jwt.response";
import { IAuthJwtPayload } from "../interfaces";
import { AuthRepository } from "../repository/auth.repository";
import { AuthJwtService } from "./auth-jwt.service";
import { AuthUserLocalSignupRequest } from "../dtos/request/auth-user-local-signup.request";
import { AuthUserLocalLoginRequest } from "../dtos/request/auth-user-local-login.request";
export declare class AuthUserService {
    private cacheManager;
    private readonly authRepository;
    private readonly authJwtService;
    private readonly googleAuth;
    constructor(cacheManager: Cache, authRepository: AuthRepository, authJwtService: AuthJwtService);
    googleLogin({ idToken }: AuthUserGoogleLoginRequest): Promise<AuthSignedJwtResponse>;
    utilizeRefreshToken({ refreshToken }: AuthUserRefreshTokenRequest): Promise<AuthSignedJwtResponse>;
    validateIsValidTokenJwtPayload(payload: IAuthJwtPayload): Promise<void>;
    signup({ email, password }: AuthUserLocalSignupRequest): Promise<AuthSignedJwtResponse>;
    login({ email, password }: AuthUserLocalLoginRequest): Promise<AuthSignedJwtResponse>;
    private createTokenPair;
}
