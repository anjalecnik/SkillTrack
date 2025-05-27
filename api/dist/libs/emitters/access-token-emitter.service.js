"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenEmitterService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const access_token_data_changed_payload_1 = require("./payloads/access-token-data-changed.payload");
const emitter_events_enum_1 = require("../../utils/types/enums/emitter-events.enum");
let AccessTokenEmitterService = class AccessTokenEmitterService {
    eventEmitter;
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    async invalidateAccessToken(payload) {
        await this.eventEmitter.emitAsync(emitter_events_enum_1.EmitterEvents.accessTokenInvalidateAll, new access_token_data_changed_payload_1.AccessTokenDataChangedPayload(payload));
    }
};
exports.AccessTokenEmitterService = AccessTokenEmitterService;
exports.AccessTokenEmitterService = AccessTokenEmitterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], AccessTokenEmitterService);
//# sourceMappingURL=access-token-emitter.service.js.map