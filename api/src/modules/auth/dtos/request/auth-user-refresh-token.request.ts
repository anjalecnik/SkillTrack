import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class AuthUserRefreshTokenRequest {
	@ApiProperty({ example: "eyJhbGciOiJIpXCJ9.eyJ1c2Vy" })
	@IsString()
	@IsNotEmpty()
	refreshToken!: string
}
