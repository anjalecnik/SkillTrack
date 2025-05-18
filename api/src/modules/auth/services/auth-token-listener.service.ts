import { CACHE_MANAGER } from "@nestjs/cache-manager"
import { Inject, Injectable } from "@nestjs/common"
import { OnEvent } from "@nestjs/event-emitter"
import type { Cache } from "cache-manager"
import { AccessTokenDataChangedPayload } from "src/libs/emitters/payloads/access-token-data-changed.payload"
import { CacheHelper } from "src/utils/helpers/cache.helper"
import { EmitterEvents } from "src/utils/types/enums/emitter-events.enum"

@Injectable()
export class AuthTokenListenerService {
	constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

	@OnEvent(EmitterEvents.accessTokenInvalidateAll)
	async handleAccessTokenChanged(payload: AccessTokenDataChangedPayload) {
		await CacheHelper.invalidateAccessTokens(this.cacheManager, payload.userId)
	}
}
