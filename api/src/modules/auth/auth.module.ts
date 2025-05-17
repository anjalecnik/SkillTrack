/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { OAuth2Client } from "google-auth-library"
import { DbModule } from "../../libs/db/db.module"
import { AuthUserController } from "./controllers/auth-user.controller"
import { AuthRepository } from "./repository/auth.repository"
import { AuthJwtService } from "./services/auth-jwt.service"
import { AuthTokenListenerService } from "./services/auth-token-listener.service"
import { AuthUserService } from "./services/auth-user.service"
import { JwtUserLoginStrategy } from "./strategies/jwt-user-login.strategy"
import { JwtWorkspaceUserStrategy } from "./strategies/jwt-workspace-user.strategy"
import { Config } from "src/utils/config/config"

@Module({
	imports: [
		DbModule,
		JwtModule.register({
			secret: Config.get<string>("JWT_SECRET_KEY"),
			signOptions: { expiresIn: Config.get<string>("JWT_EXPIRE_TIME") }
		}),
		PassportModule
	],
	controllers: [AuthUserController],
	providers: [AuthJwtService, AuthUserService, AuthTokenListenerService, JwtUserLoginStrategy, JwtWorkspaceUserStrategy, OAuth2Client, AuthRepository],
	exports: []
})
export class AuthModule {}
