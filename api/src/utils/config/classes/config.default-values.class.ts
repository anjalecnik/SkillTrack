/**
 * Type of each property should be string to represent env variable
 */
export class DefaultValues {
	POSTGRES_HOST = "127.0.0.1"
	POSTGRES_PORT = "5432"
	POSTGRES_USER = "postgres"
	SECRET_POSTGRES_PASS = "postgres"
	POSTGRES_DB = "skilltrack_db"

	JWT_SECRET_KEY = "not-so-secret-key"
	JWT_EXPIRE_TIME = "7d"
	JWT_REFRESH_SECRET_KEY = "not-so-super-secret-key"
	JWT_REFRESH_EXPIRE_TIME = "30d"

	APP_FEATURE_CACHE_JWT_ACCESS_TOKEN_PATH = "auth:jwt:accessToken"
	APP_FEATURE_CACHE_JWT_REFRESH_TOKEN_PATH = "auth:jwt:refreshToken"
}
