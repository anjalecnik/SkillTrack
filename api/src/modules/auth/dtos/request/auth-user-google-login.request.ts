import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class AuthUserGoogleLoginRequest {
	@ApiProperty({
		example: "ya26.a0Ad52N3-hYZ7avIQ_X-XOSIfO-YN8jEgqZw0169"
	})
	@IsString()
	@IsNotEmpty()
	idToken!: string
}
