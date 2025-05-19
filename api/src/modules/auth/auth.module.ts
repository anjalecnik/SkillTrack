/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { OAuth2Client } from "google-auth-library"
import { AuthUserController } from "./controllers/auth-user.controller"
import { AuthRepository } from "./repository/auth.repository"
import { AuthJwtService } from "./services/auth-jwt.service"
import { AuthTokenListenerService } from "./services/auth-token-listener.service"
import { AuthUserService } from "./services/auth-user.service"
import { JwtWorkspaceUserStrategy } from "./strategies/jwt-workspace-user.strategy"
import { Config } from "src/utils/config/config"
import { CacheModule } from "@nestjs/cache-manager"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "src/libs/db/entities/user.entity"
import { JwtUserLoginStrategy } from "./strategies/jwt-user-login.strategy"

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		JwtModule.register({
			secret: Config.get<string>("JWT_SECRET_KEY"),
			signOptions: { expiresIn: Config.get<string>("JWT_EXPIRE_TIME") }
		}),
		CacheModule.register(),
		PassportModule
	],
	controllers: [AuthUserController],
	providers: [AuthJwtService, AuthUserService, AuthTokenListenerService, JwtUserLoginStrategy, JwtWorkspaceUserStrategy, OAuth2Client, AuthRepository],
	exports: []
})
export class AuthModule {}
