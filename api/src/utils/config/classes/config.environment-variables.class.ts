/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Expose } from "class-transformer"
import { IsInt, IsString, Max, Min } from "class-validator"

export class EnvironmentVariables {
	@Expose()
	@IsString()
	POSTGRES_HOST!: string

	@Expose()
	@IsString()
	POSTGRES_USER!: string

	@Expose()
	@IsString()
	SECRET_POSTGRES_PASS!: string

	@Expose()
	@IsString()
	POSTGRES_DB!: string

	@Expose()
	@IsInt()
	@Min(0)
	@Max(65535)
	POSTGRES_PORT!: number
}
