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
exports.UserActivityRequestReviewRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_activity_status_enum_1 = require("../../../../../../utils/types/enums/user-activity-status.enum");
class UserActivityRequestReviewRequest {
    status;
}
exports.UserActivityRequestReviewRequest = UserActivityRequestReviewRequest;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Activity status", example: user_activity_status_enum_1.UserActivityStatus.Rejected }),
    (0, class_validator_1.IsEnum)(user_activity_status_enum_1.UserActivityStatus),
    (0, class_validator_1.IsIn)([user_activity_status_enum_1.UserActivityStatus.Rejected, user_activity_status_enum_1.UserActivityStatus.Approved]),
    __metadata("design:type", String)
], UserActivityRequestReviewRequest.prototype, "status", void 0);
//# sourceMappingURL=user-activity-request-review.request.js.map