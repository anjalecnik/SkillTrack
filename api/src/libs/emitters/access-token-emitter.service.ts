import { Injectable } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { AccessTokenDataChangedPayload } from "./payloads/access-token-data-changed.payload"
import { EmitterEvents } from "src/utils/types/enums/emitter-events.enum"

@Injectable()
export class AccessTokenEmitterService {
	constructor(private eventEmitter: EventEmitter2) {}

	async invalidateAccessToken(payload: AccessTokenDataChangedPayload): Promise<void> {
		await this.eventEmitter.emitAsync(EmitterEvents.accessTokenInvalidateAll, new AccessTokenDataChangedPayload(payload))
	}
}
