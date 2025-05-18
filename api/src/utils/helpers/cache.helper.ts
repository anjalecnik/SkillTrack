/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Cache } from "cache-manager"
import { Config } from "../config/config"

export abstract class CacheHelper {
	static async invalidatePattern(cache: Cache, pattern: string): Promise<void> {
		const store = (cache as any).store as { keys: (pattern: string) => Promise<string[]> }

		if (typeof store.keys !== "function") {
			throw new Error("The underlying cache store does not support pattern-based key retrieval.")
		}

		const keys = await store.keys(pattern)
		await Promise.all(keys.map(key => cache.del(key)))
	}

	//#region  Auth
	static getPathJwtAccessToken(userId: number, uuid: string) {
		return `${Config.get<string>("APP_FEATURE_CACHE_JWT_ACCESS_TOKEN_PATH")}:${userId}:${uuid}`
	}

	static getPathJwtRefreshToken(userId: number, uuid: string) {
		return `${Config.get<string>("APP_FEATURE_CACHE_JWT_REFRESH_TOKEN_PATH")}:${userId}:${uuid}`
	}

	static async invalidateRefreshToken(cache: Cache, userId: number, uuid: string) {
		await cache.del(`${Config.get<string>("APP_FEATURE_CACHE_JWT_REFRESH_TOKEN_PATH")}:${userId}:${uuid}`)
	}

	static async invalidateAccessToken(cache: Cache, userId: number, uuid: string) {
		await cache.del(`${Config.get<string>("APP_FEATURE_CACHE_JWT_ACCESS_TOKEN_PATH")}:${userId}:${uuid}`)
	}

	static async invalidateAccessTokens(cache: Cache, userId: number) {
		await this.invalidatePattern(cache, `${Config.get<string>("APP_FEATURE_CACHE_JWT_ACCESS_TOKEN_PATH")}:${userId}:*`)
	}
	//#endregion Auth
}
