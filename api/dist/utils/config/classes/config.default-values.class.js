"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultValues = void 0;
class DefaultValues {
    APP_HOST = "0.0.0.0";
    APP_PORT = "8080";
    APP_API_PREFIX = "api";
    GLOBAL_PREFIX = "api";
    APP_CORS_ORIGIN = "*";
    APP_CORS_METHODS = "GET, PUT, PATCH, POST, DELETE, HEAD, OPTIONS";
    POSTGRES_HOST = "127.0.0.1";
    POSTGRES_PORT = "5432";
    POSTGRES_USER = "postgres";
    SECRET_POSTGRES_PASS = "postgres";
    POSTGRES_DB = "skilltrack_db";
    JWT_SECRET_KEY = "not-so-secret-key";
    JWT_EXPIRE_TIME = "7d";
    JWT_REFRESH_SECRET_KEY = "not-so-super-secret-key";
    JWT_REFRESH_EXPIRE_TIME = "30d";
    REDIS_HOST = "localhost";
    REDIS_PORT = "6379";
    APP_FEATURE_CACHE_DEFAULT_TTL_IN_SEC = "300";
    APP_FEATURE_CACHE_JWT_ACCESS_TOKEN_PATH = "auth:jwt:accessToken";
    APP_FEATURE_CACHE_JWT_REFRESH_TOKEN_PATH = "auth:jwt:refreshToken";
    GOOGLE_CLIENT_ID = "830251780992-4mg5q31387jh8vra1k8qvektob9drjv9.apps.googleusercontent.com";
    GOOGLE_CLIENT_SECRET = "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";
    GOOGLE_CALLBACK_URL = "http://localhost:8080/api/auth/users/google/redirect";
    APP_FEATURE_USER_ACTIVITY_DAILY_EDIT_DAYS_LIMIT = "7";
}
exports.DefaultValues = DefaultValues;
//# sourceMappingURL=config.default-values.class.js.map