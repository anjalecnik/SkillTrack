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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenListenerService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const access_token_data_changed_payload_1 = require("../../../libs/emitters/payloads/access-token-data-changed.payload");
const cache_helper_1 = require("../../../utils/helpers/cache.helper");
const emitter_events_enum_1 = require("../../../utils/types/enums/emitter-events.enum");
let AuthTokenListenerService = class AuthTokenListenerService {
    cacheManager;
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async handleAccessTokenChanged(payload) {
        await cache_helper_1.CacheHelper.invalidateAccessTokens(this.cacheManager, payload.userId);
    }
};
exports.AuthTokenListenerService = AuthTokenListenerService;
__decorate([
    (0, event_emitter_1.OnEvent)(emitter_events_enum_1.EmitterEvents.accessTokenInvalidateAll),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [access_token_data_changed_payload_1.AccessTokenDataChangedPayload]),
    __metadata("design:returntype", Promise)
], AuthTokenListenerService.prototype, "handleAccessTokenChanged", null);
exports.AuthTokenListenerService = AuthTokenListenerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], AuthTokenListenerService);
//# sourceMappingURL=auth-token-listener.service.js.map