import { Body, Controller, Post } from "@nestjs/common"
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { AuthUserGoogleLoginRequest } from "../dtos/request/auth-user-google-login.request"
import { AuthUserRefreshTokenRequest } from "../dtos/request/auth-user-refresh-token.request"
import { AuthSignedJwtResponse } from "../dtos/response/auth-signed-jwt.response"
import { AuthUserService } from "../services/auth-user.service"
import { ROUTE_AUTH, ROUTE_USER } from "src/utils/constants"
import { AuthUserLocalSignupRequest } from "../dtos/request/auth-user-local-signup.request"
import { AuthUserLocalLoginRequest } from "../dtos/request/auth-user-local-login.request"

@Controller(`${ROUTE_AUTH}/${ROUTE_USER}`)
@ApiTags("Auth User")
export class AuthUserController {
	constructor(private readonly authUserService: AuthUserService) {}

	@Post("/sign-up")
	@ApiOperation({ summary: "Basic Signup" })
	@ApiCreatedResponse({ description: "Signup", type: AuthSignedJwtResponse })
	async signup(@Body() authUserEmailSignupRequest: AuthUserLocalSignupRequest): Promise<AuthSignedJwtResponse> {
		return this.authUserService.signup(authUserEmailSignupRequest)
	}

	@Post("/login")
	@ApiOperation({ summary: "Basic Login" })
	@ApiCreatedResponse({ description: "Login", type: AuthSignedJwtResponse })
	async login(@Body() authUserEmailLoginRequest: AuthUserLocalLoginRequest): Promise<AuthSignedJwtResponse> {
		return this.authUserService.login(authUserEmailLoginRequest)
	}

	@Post("/google/login")
	@ApiOperation({ summary: "Google Login" })
	@ApiCreatedResponse({ description: "Google Login", type: AuthSignedJwtResponse })
	async googleLogin(@Body() authUserGoogleRequest: AuthUserGoogleLoginRequest): Promise<AuthSignedJwtResponse> {
		return this.authUserService.googleLogin(authUserGoogleRequest)
	}

	@Post("/refresh")
	@ApiOperation({ summary: "Refresh Token", description: "Refresh Token" })
	async utilizeRefreshToken(@Body() refreshTokenData: AuthUserRefreshTokenRequest): Promise<AuthSignedJwtResponse> {
		return this.authUserService.utilizeRefreshToken(refreshTokenData)
	}
}
