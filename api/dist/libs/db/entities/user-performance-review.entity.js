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
exports.UserPerformanceReviewEntity = void 0;
const constants_1 = require("../../../utils/constants");
const typeorm_1 = require("typeorm");
const user_performance_review_quartal_enum_1 = require("../../../utils/types/enums/user-performance-review-quartal.enum");
const user_entity_1 = require("./user.entity");
const user_activity_entity_1 = require("./user-activity.entity");
let UserPerformanceReviewEntity = class UserPerformanceReviewEntity {
    id;
    answer1;
    answer2;
    answer3;
    answer4;
    quartal;
    year;
    score;
    createdAt;
    updatedAt;
    userId;
    user;
    activities;
};
exports.UserPerformanceReviewEntity = UserPerformanceReviewEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserPerformanceReviewEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer"
    }),
    __metadata("design:type", Number)
], UserPerformanceReviewEntity.prototype, "answer1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer"
    }),
    __metadata("design:type", Number)
], UserPerformanceReviewEntity.prototype, "answer2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean"
    }),
    __metadata("design:type", Boolean)
], UserPerformanceReviewEntity.prototype, "answer3", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean"
    }),
    __metadata("design:type", Boolean)
], UserPerformanceReviewEntity.prototype, "answer4", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_16
    }),
    __metadata("design:type", String)
], UserPerformanceReviewEntity.prototype, "quartal", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer"
    }),
    __metadata("design:type", Number)
], UserPerformanceReviewEntity.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal"
    }),
    __metadata("design:type", Number)
], UserPerformanceReviewEntity.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserPerformanceReviewEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserPerformanceReviewEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user"
    }),
    __metadata("design:type", Number)
], UserPerformanceReviewEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.performanceReviews),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserPerformanceReviewEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_activity_entity_1.UserActivityEntity, activity => activity.performanceReview),
    __metadata("design:type", Array)
], UserPerformanceReviewEntity.prototype, "activities", void 0);
exports.UserPerformanceReviewEntity = UserPerformanceReviewEntity = __decorate([
    (0, typeorm_1.Entity)("user_performance_review")
], UserPerformanceReviewEntity);
//# sourceMappingURL=user-performance-review.entity.js.map