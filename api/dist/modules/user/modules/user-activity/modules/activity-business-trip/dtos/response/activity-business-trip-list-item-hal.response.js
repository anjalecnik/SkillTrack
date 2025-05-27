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
exports.ActivityBusinessTripListItemHalResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const activity_list_item_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-list-item-hal-base.response");
const dtos_1 = require("../../../../../../../../utils/types/dtos");
class ActivityBusinessTripListItemHalResponse extends activity_list_item_hal_base_response_1.ActivityListItemHalBaseResponse {
    dateStart;
    dateEnd;
    date;
    description;
    location;
    distanceInKM;
    reviewedByWorkspaceUserId;
    projectId;
    projectName;
}
exports.ActivityBusinessTripListItemHalResponse = ActivityBusinessTripListItemHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ type: dtos_1.DateTimeWithoutTimezoneResponse }),
    __metadata("design:type", dtos_1.DateTimeWithoutTimezoneResponse)
], ActivityBusinessTripListItemHalResponse.prototype, "dateStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: dtos_1.DateTimeWithoutTimezoneResponse }),
    __metadata("design:type", dtos_1.DateTimeWithoutTimezoneResponse)
], ActivityBusinessTripListItemHalResponse.prototype, "dateEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01" }),
    __metadata("design:type", String)
], ActivityBusinessTripListItemHalResponse.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Q1 Planning" }),
    __metadata("design:type", String)
], ActivityBusinessTripListItemHalResponse.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Maribor Slovenia" }),
    __metadata("design:type", String)
], ActivityBusinessTripListItemHalResponse.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10 }),
    __metadata("design:type", Number)
], ActivityBusinessTripListItemHalResponse.prototype, "distanceInKM", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], ActivityBusinessTripListItemHalResponse.prototype, "reviewedByWorkspaceUserId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], ActivityBusinessTripListItemHalResponse.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Bob's project" }),
    __metadata("design:type", String)
], ActivityBusinessTripListItemHalResponse.prototype, "projectName", void 0);
//# sourceMappingURL=activity-business-trip-list-item-hal.response.js.map