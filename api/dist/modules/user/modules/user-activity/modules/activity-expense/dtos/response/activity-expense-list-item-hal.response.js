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
exports.ActivityExpenseListItemHalResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const activity_list_item_hal_base_response_1 = require("../../../activity-shared/dtos/response/activity-list-item-hal-base.response");
class ActivityExpenseListItemHalResponse extends activity_list_item_hal_base_response_1.ActivityListItemHalBaseResponse {
    date;
    description;
    valueInEuro;
    isPaidWithCompanyCard;
    reviewedByUserId;
    fileName;
    fileUrl;
    projectId;
    projectName;
}
exports.ActivityExpenseListItemHalResponse = ActivityExpenseListItemHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-01-01" }),
    __metadata("design:type", String)
], ActivityExpenseListItemHalResponse.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Q1 Planning" }),
    __metadata("design:type", String)
], ActivityExpenseListItemHalResponse.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], ActivityExpenseListItemHalResponse.prototype, "valueInEuro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, example: true }),
    __metadata("design:type", Boolean)
], ActivityExpenseListItemHalResponse.prototype, "isPaidWithCompanyCard", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], ActivityExpenseListItemHalResponse.prototype, "reviewedByUserId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Planning" }),
    __metadata("design:type", String)
], ActivityExpenseListItemHalResponse.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ActivityExpenseListItemHalResponse.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], ActivityExpenseListItemHalResponse.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Bob's project" }),
    __metadata("design:type", String)
], ActivityExpenseListItemHalResponse.prototype, "projectName", void 0);
//# sourceMappingURL=activity-expense-list-item-hal.response.js.map