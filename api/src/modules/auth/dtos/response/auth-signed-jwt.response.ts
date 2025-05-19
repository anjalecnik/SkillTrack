import { ApiProperty } from "@nestjs/swagger"

export class AuthSignedJwtResponse {
	@ApiProperty({ example: "eyJhbGciOiJIpXCJ9.eyJ1c2Vy" })
	accessToken!: string

	@ApiProperty({ example: "eyJhbGciOiJIpXCJ9.eyJ1c2Vy" })
	refreshToken!: string
}
