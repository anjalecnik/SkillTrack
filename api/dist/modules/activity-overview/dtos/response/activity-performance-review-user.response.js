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
exports.UserWithActivitiesPerformanceReview = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserWithActivitiesPerformanceReview {
    name;
    surname;
    middleName;
    email;
    scores;
}
exports.UserWithActivitiesPerformanceReview = UserWithActivitiesPerformanceReview;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User first name" }),
    __metadata("design:type", String)
], UserWithActivitiesPerformanceReview.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User last name" }),
    __metadata("design:type", String)
], UserWithActivitiesPerformanceReview.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User middle name" }),
    __metadata("design:type", Object)
], UserWithActivitiesPerformanceReview.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User email" }),
    __metadata("design:type", String)
], UserWithActivitiesPerformanceReview.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User performance review scores", isArray: true }),
    __metadata("design:type", Array)
], UserWithActivitiesPerformanceReview.prototype, "scores", void 0);
//# sourceMappingURL=activity-performance-review-user.response.js.map