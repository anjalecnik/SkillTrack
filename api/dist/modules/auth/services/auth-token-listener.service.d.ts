import type { Cache } from "cache-manager";
import { AccessTokenDataChangedPayload } from "src/libs/emitters/payloads/access-token-data-changed.payload";
export declare class AuthTokenListenerService {
    private cacheManager;
    constructor(cacheManager: Cache);
    handleAccessTokenChanged(payload: AccessTokenDataChangedPayload): Promise<void>;
}
