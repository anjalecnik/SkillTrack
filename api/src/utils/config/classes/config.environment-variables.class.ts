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

	//----------------
	// JWT
	//----------------
	@Expose()
	@IsString()
	JWT_SECRET_KEY!: string

	@Expose()
	@IsString()
	JWT_EXPIRE_TIME!: string

	@Expose()
	@IsString()
	JWT_REFRESH_SECRET_KEY!: string

	@Expose()
	@IsString()
	JWT_REFRESH_EXPIRE_TIME!: string

	//----------------
	// REDIS
	//----------------
	@Expose()
	@IsString()
	REDIS_HOST!: string

	@Expose()
	@IsInt()
	@Min(0)
	@Max(65535)
	REDIS_PORT!: number

	//----------------
	// GOOGLE
	//----------------
	@Expose()
	@IsString()
	GOOGLE_CLIENT_ID!: string

	@Expose()
	@IsString()
	GOOGLE_CLIENT_SECRET!: string

	@Expose()
	@IsString()
	GOOGLE_CALLBACK_URL!: string

	//----------------
	// APP
	//----------------
	@Expose()
	@IsInt()
	@Min(0)
	@Max(65535)
	APP_PORT!: number

	@Expose()
	@IsString()
	APP_API_PREFIX!: string

	@Expose()
	@IsString()
	APP_URL!: string

	@Expose()
	@IsString()
	API_URL!: string

	@Expose()
	@IsString()
	APP_CORS_ORIGIN!: string

	@Expose()
	@IsString()
	APP_CORS_METHODS!: string

	//----------------
	// JIRA
	//----------------
	@Expose()
	@IsString()
	JIRA_API_TOKEN
}
