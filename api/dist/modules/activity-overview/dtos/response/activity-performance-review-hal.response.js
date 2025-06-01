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
exports.ActivityPerformanceReviewHalResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../../../../utils/types/dtos");
const activity_performance_review_user_response_1 = require("./activity-performance-review-user.response");
class ActivityPerformanceReviewHalResponse {
    _links;
    data;
    meta;
}
exports.ActivityPerformanceReviewHalResponse = ActivityPerformanceReviewHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            self: { href: "api/activities?userIds=8&userIds=9" }
        },
        description: "Links for the resource"
    }),
    __metadata("design:type", Object)
], ActivityPerformanceReviewHalResponse.prototype, "_links", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: activity_performance_review_user_response_1.UserWithActivitiesPerformanceReview, isArray: true, description: "List of users with their performance reviews" }),
    __metadata("design:type", Array)
], ActivityPerformanceReviewHalResponse.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: "Total number of users" }),
    __metadata("design:type", dtos_1.PaginatedMetaResponse)
], ActivityPerformanceReviewHalResponse.prototype, "meta", void 0);
//# sourceMappingURL=activity-performance-review-hal.response.js.map