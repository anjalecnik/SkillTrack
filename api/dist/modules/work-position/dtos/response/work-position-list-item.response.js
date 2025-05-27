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
exports.WorkPositionListItemResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const work_position_enum_1 = require("../../../../utils/types/enums/work-position.enum");
const work_position_promotion_list_item_response_1 = require("./work-position-promotion-list-item.response");
class WorkPositionListItemResponse {
    id;
    name;
    level;
    description;
    workPromotion;
}
exports.WorkPositionListItemResponse = WorkPositionListItemResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Work position id", example: 1 }),
    __metadata("design:type", Number)
], WorkPositionListItemResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Work position name", example: "Junior Backend Developer" }),
    __metadata("design:type", String)
], WorkPositionListItemResponse.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Work position level [L01 - L10]", example: work_position_enum_1.WorkPositionLevel.L03, enum: work_position_enum_1.WorkPositionLevel }),
    __metadata("design:type", String)
], WorkPositionListItemResponse.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Description of work position", example: "Responsible for building REST Api" }),
    __metadata("design:type", String)
], WorkPositionListItemResponse.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Reference to promotion work position id", example: 1 }),
    __metadata("design:type", work_position_promotion_list_item_response_1.WorkPositionPromotionListItemResponse)
], WorkPositionListItemResponse.prototype, "workPromotion", void 0);
//# sourceMappingURL=work-position-list-item.response.js.map