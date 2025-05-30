/**
 * Type of each property should be string to represent env variable
 */
export class DefaultValues {
	APP_HOST = "0.0.0.0"
	APP_PORT = "8080"
	APP_API_PREFIX = "api"
	GLOBAL_PREFIX = "api"
	APP_CORS_ORIGIN = "*"
	APP_CORS_METHODS = "GET, PUT, PATCH, POST, DELETE, HEAD, OPTIONS"

	POSTGRES_HOST = "127.0.0.1"
	POSTGRES_PORT = "5432"
	POSTGRES_USER = "postgres"
	SECRET_POSTGRES_PASS = "postgres"
	POSTGRES_DB = "skilltrack_db"

	JWT_SECRET_KEY = "not-so-secret-key"
	JWT_EXPIRE_TIME = "7d"
	JWT_REFRESH_SECRET_KEY = "not-so-super-secret-key"
	JWT_REFRESH_EXPIRE_TIME = "30d"

	REDIS_HOST = "localhost"
	REDIS_PORT = "6379"
	APP_FEATURE_CACHE_DEFAULT_TTL_IN_SEC = "300"

	APP_FEATURE_CACHE_JWT_ACCESS_TOKEN_PATH = "auth:jwt:accessToken"
	APP_FEATURE_CACHE_JWT_REFRESH_TOKEN_PATH = "auth:jwt:refreshToken"

	GOOGLE_CLIENT_ID = ""
	GOOGLE_CLIENT_SECRET = ""
	GOOGLE_CALLBACK_URL = "http://localhost:8080/api/auth/users/google/redirect"

	APP_FEATURE_USER_ACTIVITY_DAILY_EDIT_DAYS_LIMIT = "7"

	JIRA_API_TOKEN = ""
}
