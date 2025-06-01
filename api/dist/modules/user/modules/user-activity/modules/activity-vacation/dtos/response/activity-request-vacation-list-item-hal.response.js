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
exports.ActivityRequestVacationListItemHalResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const activity_request_embedded_activity_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-request-embedded-activity-hal-base.response");
const activity_request_embedded_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-request-embedded-hal-base.response");
const activity_request_list_item_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response");
class ActivityRequestVacationActivityListItemEmbeddedActivityHalResponse extends activity_request_embedded_activity_hal_base_response_1.ActivityRequestEmbeddedActivityHalBaseResponse {
}
class ActivityRequestVacationListItemEmbeddedItemsHalResponse extends activity_request_embedded_hal_base_response_1.ActivityRequestEmbeddedHalBaseResponse {
    activities;
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: ActivityRequestVacationActivityListItemEmbeddedActivityHalResponse, isArray: true }),
    __metadata("design:type", Array)
], ActivityRequestVacationListItemEmbeddedItemsHalResponse.prototype, "activities", void 0);
class ActivityRequestVacationListItemHalResponse extends activity_request_list_item_hal_base_response_1.ActivityRequestListItemHalBaseResponse {
    dateStart;
    dateEnd;
    description;
    reviewedByWorkspaceUserId;
}
exports.ActivityRequestVacationListItemHalResponse = ActivityRequestVacationListItemHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01" }),
    __metadata("design:type", String)
], ActivityRequestVacationListItemHalResponse.prototype, "dateStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01" }),
    __metadata("design:type", String)
], ActivityRequestVacationListItemHalResponse.prototype, "dateEnd", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Vacation time" }),
    __metadata("design:type", String)
], ActivityRequestVacationListItemHalResponse.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], ActivityRequestVacationListItemHalResponse.prototype, "reviewedByWorkspaceUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ActivityRequestVacationListItemEmbeddedItemsHalResponse }),
    __metadata("design:type", ActivityRequestVacationListItemEmbeddedItemsHalResponse)
], ActivityRequestVacationListItemHalResponse.prototype, "_embedded", void 0);
//# sourceMappingURL=activity-request-vacation-list-item-hal.response.js.map