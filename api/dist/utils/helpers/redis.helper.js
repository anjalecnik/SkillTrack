"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisHelper = void 0;
class RedisHelper {
    static ONE_DAY_MILLISECONDS = 86_400_000;
    static setTTL(ttlInMs) {
        return { ttl: ttlInMs / 1000 };
    }
}
exports.RedisHelper = RedisHelper;
//# sourceMappingURL=redis.helper.js.map