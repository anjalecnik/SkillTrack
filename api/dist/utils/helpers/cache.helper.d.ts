import type { Cache } from "cache-manager";
export declare abstract class CacheHelper {
    static invalidatePattern(cache: Cache, pattern: string): Promise<void>;
    static getPathJwtAccessToken(userId: number, uuid: string): string;
    static getPathJwtRefreshToken(userId: number, uuid: string): string;
    static invalidateRefreshToken(cache: Cache, userId: number, uuid: string): Promise<void>;
    static invalidateAccessToken(cache: Cache, userId: number, uuid: string): Promise<void>;
    static invalidateAccessTokens(cache: Cache, userId: number): Promise<void>;
}
