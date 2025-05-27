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
exports.ActivityRequestBusinessTripListItemHalResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const activity_request_embedded_activity_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-request-embedded-activity-hal-base.response");
const activity_request_embedded_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-request-embedded-hal-base.response");
const activity_request_list_item_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response");
const dtos_1 = require("../../../../../../../../utils/types/dtos");
class ActivityRequestBusinessTripActivityListItemEmbeddedActivityHalResponse extends activity_request_embedded_activity_hal_base_response_1.ActivityRequestEmbeddedActivityHalBaseResponse {
}
class ActivityRequestBusinessTripListItemEmbeddedItemsHalResponse extends activity_request_embedded_hal_base_response_1.ActivityRequestEmbeddedHalBaseResponse {
    activities;
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: ActivityRequestBusinessTripActivityListItemEmbeddedActivityHalResponse, isArray: true }),
    __metadata("design:type", Array)
], ActivityRequestBusinessTripListItemEmbeddedItemsHalResponse.prototype, "activities", void 0);
class ActivityRequestBusinessTripListItemHalResponse extends activity_request_list_item_hal_base_response_1.ActivityRequestListItemHalBaseResponse {
    dateStart;
    dateEnd;
    description;
    location;
    distanceInKM;
    reviewedByWorkspaceUserId;
    projectId;
    projectName;
}
exports.ActivityRequestBusinessTripListItemHalResponse = ActivityRequestBusinessTripListItemHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ type: dtos_1.DateTimeWithoutTimezoneResponse }),
    __metadata("design:type", dtos_1.DateTimeWithoutTimezoneResponse)
], ActivityRequestBusinessTripListItemHalResponse.prototype, "dateStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: dtos_1.DateTimeWithoutTimezoneResponse }),
    __metadata("design:type", dtos_1.DateTimeWithoutTimezoneResponse)
], ActivityRequestBusinessTripListItemHalResponse.prototype, "dateEnd", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Q1 Planning" }),
    __metadata("design:type", String)
], ActivityRequestBusinessTripListItemHalResponse.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Maribor Slovenia" }),
    __metadata("design:type", String)
], ActivityRequestBusinessTripListItemHalResponse.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10 }),
    __metadata("design:type", Number)
], ActivityRequestBusinessTripListItemHalResponse.prototype, "distanceInKM", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], ActivityRequestBusinessTripListItemHalResponse.prototype, "reviewedByWorkspaceUserId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], ActivityRequestBusinessTripListItemHalResponse.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Bob's project" }),
    __metadata("design:type", String)
], ActivityRequestBusinessTripListItemHalResponse.prototype, "projectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ActivityRequestBusinessTripListItemEmbeddedItemsHalResponse }),
    __metadata("design:type", ActivityRequestBusinessTripListItemEmbeddedItemsHalResponse)
], ActivityRequestBusinessTripListItemHalResponse.prototype, "_embedded", void 0);
//# sourceMappingURL=activity-request-business-trip-list-item-hal.response.js.map