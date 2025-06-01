import { EventEmitter2 } from "@nestjs/event-emitter";
import { AccessTokenDataChangedPayload } from "./payloads/access-token-data-changed.payload";
export declare class AccessTokenEmitterService {
    private eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    invalidateAccessToken(payload: AccessTokenDataChangedPayload): Promise<void>;
}
