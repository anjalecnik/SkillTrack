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
exports.ActivityRequestExpenseListItemHalResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const activity_request_embedded_activity_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-request-embedded-activity-hal-base.response");
const activity_request_embedded_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-request-embedded-hal-base.response");
const activity_request_list_item_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-request-list-item-hal-base.response");
class ActivityRequestExpenseActivityListItemEmbeddedActivityHalResponse extends activity_request_embedded_activity_hal_base_response_1.ActivityRequestEmbeddedActivityHalBaseResponse {
}
class ActivityRequestExpenseListItemEmbeddedItemsHalResponse extends activity_request_embedded_hal_base_response_1.ActivityRequestEmbeddedHalBaseResponse {
    activities;
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: ActivityRequestExpenseActivityListItemEmbeddedActivityHalResponse, isArray: true }),
    __metadata("design:type", Array)
], ActivityRequestExpenseListItemEmbeddedItemsHalResponse.prototype, "activities", void 0);
class ActivityRequestExpenseListItemHalResponse extends activity_request_list_item_hal_base_response_1.ActivityRequestListItemHalBaseResponse {
    date;
    description;
    fileName;
    fileUrl;
    valueInEuro;
    isPaidWithCompanyCard;
    reviewedByUserId;
    projectId;
    projectName;
}
exports.ActivityRequestExpenseListItemHalResponse = ActivityRequestExpenseListItemHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01" }),
    __metadata("design:type", String)
], ActivityRequestExpenseListItemHalResponse.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Q1 Planning" }),
    __metadata("design:type", String)
], ActivityRequestExpenseListItemHalResponse.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Planning" }),
    __metadata("design:type", String)
], ActivityRequestExpenseListItemHalResponse.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ActivityRequestExpenseListItemHalResponse.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], ActivityRequestExpenseListItemHalResponse.prototype, "valueInEuro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, example: true }),
    __metadata("design:type", Boolean)
], ActivityRequestExpenseListItemHalResponse.prototype, "isPaidWithCompanyCard", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], ActivityRequestExpenseListItemHalResponse.prototype, "reviewedByUserId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], ActivityRequestExpenseListItemHalResponse.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Bob's project" }),
    __metadata("design:type", String)
], ActivityRequestExpenseListItemHalResponse.prototype, "projectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ActivityRequestExpenseListItemEmbeddedItemsHalResponse }),
    __metadata("design:type", ActivityRequestExpenseListItemEmbeddedItemsHalResponse)
], ActivityRequestExpenseListItemHalResponse.prototype, "_embedded", void 0);
//# sourceMappingURL=activity-request-expense-list-item-hal.response.js.map