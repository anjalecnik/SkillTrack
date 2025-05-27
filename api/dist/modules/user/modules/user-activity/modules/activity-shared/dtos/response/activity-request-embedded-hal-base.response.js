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
exports.ActivityRequestEmbeddedHalBaseResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../../../../../../../../utils/types/dtos");
const user_activity_request_actions_enum_1 = require("../../../../../../../../utils/types/enums/user-activity-request-actions.enum");
class ActivityRequestEmbeddedHalBaseResponse extends dtos_1.HalResourceStandardResponse {
    user;
    actions;
}
exports.ActivityRequestEmbeddedHalBaseResponse = ActivityRequestEmbeddedHalBaseResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ type: dtos_1.UserShortHalResponse }),
    __metadata("design:type", dtos_1.UserShortHalResponse)
], ActivityRequestEmbeddedHalBaseResponse.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_activity_request_actions_enum_1.UserActivityRequestActions, isArray: true }),
    __metadata("design:type", Array)
], ActivityRequestEmbeddedHalBaseResponse.prototype, "actions", void 0);
//# sourceMappingURL=activity-request-embedded-hal-base.response.js.map