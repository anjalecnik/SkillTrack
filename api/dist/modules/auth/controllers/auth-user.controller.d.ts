import { AuthUserGoogleLoginRequest } from "../dtos/request/auth-user-google-login.request";
import { AuthUserRefreshTokenRequest } from "../dtos/request/auth-user-refresh-token.request";
import { AuthSignedJwtResponse } from "../dtos/response/auth-signed-jwt.response";
import { AuthUserService } from "../services/auth-user.service";
import { AuthUserLocalSignupRequest } from "../dtos/request/auth-user-local-signup.request";
import { AuthUserLocalLoginRequest } from "../dtos/request/auth-user-local-login.request";
export declare class AuthUserController {
    private readonly authUserService;
    constructor(authUserService: AuthUserService);
    signup(authUserEmailSignupRequest: AuthUserLocalSignupRequest): Promise<AuthSignedJwtResponse>;
    login(authUserEmailLoginRequest: AuthUserLocalLoginRequest): Promise<AuthSignedJwtResponse>;
    googleLogin(authUserGoogleRequest: AuthUserGoogleLoginRequest): Promise<AuthSignedJwtResponse>;
    utilizeRefreshToken(refreshTokenData: AuthUserRefreshTokenRequest): Promise<AuthSignedJwtResponse>;
}
