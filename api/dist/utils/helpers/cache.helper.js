"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheHelper = void 0;
const config_1 = require("../config/config");
class CacheHelper {
    static async invalidatePattern(cache, pattern) {
        const store = cache.store;
        if (typeof store.keys !== "function") {
            throw new Error("The underlying cache store does not support pattern-based key retrieval.");
        }
        const keys = await store.keys(pattern);
        await Promise.all(keys.map(key => cache.del(key)));
    }
    static getPathJwtAccessToken(userId, uuid) {
        return `${config_1.Config.get("APP_FEATURE_CACHE_JWT_ACCESS_TOKEN_PATH")}:${userId}:${uuid}`;
    }
    static getPathJwtRefreshToken(userId, uuid) {
        return `${config_1.Config.get("APP_FEATURE_CACHE_JWT_REFRESH_TOKEN_PATH")}:${userId}:${uuid}`;
    }
    static async invalidateRefreshToken(cache, userId, uuid) {
        await cache.del(`${config_1.Config.get("APP_FEATURE_CACHE_JWT_REFRESH_TOKEN_PATH")}:${userId}:${uuid}`);
    }
    static async invalidateAccessToken(cache, userId, uuid) {
        await cache.del(`${config_1.Config.get("APP_FEATURE_CACHE_JWT_ACCESS_TOKEN_PATH")}:${userId}:${uuid}`);
    }
    static async invalidateAccessTokens(cache, userId) {
        await this.invalidatePattern(cache, `${config_1.Config.get("APP_FEATURE_CACHE_JWT_ACCESS_TOKEN_PATH")}:${userId}:*`);
    }
}
exports.CacheHelper = CacheHelper;
//# sourceMappingURL=cache.helper.js.map