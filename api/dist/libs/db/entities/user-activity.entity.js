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
exports.UserActivityEntity = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../../../utils/constants");
const user_activity_enum_1 = require("../../../utils/types/enums/user-activity.enum");
const user_activity_status_enum_1 = require("../../../utils/types/enums/user-activity-status.enum");
const user_entity_1 = require("./user.entity");
const project_entity_1 = require("./project.entity");
const user_activity_request_entity_1 = require("./user-activity-request.entity");
const user_working_hours_entity_1 = require("./user-working-hours.entity");
const user_vacation_assigned_entity_1 = require("./user-vacation-assigned.entity");
const user_performance_review_entity_1 = require("./user-performance-review.entity");
let UserActivityEntity = class UserActivityEntity {
    id;
    activityType;
    status;
    date;
    hours;
    workLocation;
    userId;
    reportedByUserId;
    reviewedByUserId;
    projectId;
    activityRequestId;
    workingHoursId;
    businessTripId;
    vacationId;
    sickLeaveId;
    vacationAssignedId;
    performanceReviewId;
    user;
    reportedByUser;
    reviewedByUser;
    project;
    activityRequest;
    workingHours;
    userVacationAssigned;
    performanceReview;
    updatedAt;
    createdAt;
};
exports.UserActivityEntity = UserActivityEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserActivityEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_32
    }),
    __metadata("design:type", String)
], UserActivityEntity.prototype, "activityType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_32
    }),
    __metadata("design:type", String)
], UserActivityEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp"
    }),
    __metadata("design:type", Date)
], UserActivityEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        nullable: true,
        comment: "Hours worked. Used for Daily, Overtime, BusinessTrip, OnCall"
    }),
    __metadata("design:type", Object)
], UserActivityEntity.prototype, "hours", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
        length: constants_1.DB_VARCHAR_LENGTH_32
    }),
    __metadata("design:type", Object)
], UserActivityEntity.prototype, "workLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user"
    }),
    __metadata("design:type", Number)
], UserActivityEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the reporter"
    }),
    __metadata("design:type", Number)
], UserActivityEntity.prototype, "reportedByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the reviewer",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityEntity.prototype, "reviewedByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the project",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityEntity.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to activity request",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityEntity.prototype, "activityRequestId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to user working hours",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityEntity.prototype, "workingHoursId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to business trip",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityEntity.prototype, "businessTripId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to vacation",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityEntity.prototype, "vacationId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to sick leave",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityEntity.prototype, "sickLeaveId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user assigned vacations",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityEntity.prototype, "vacationAssignedId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to performance review",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityEntity.prototype, "performanceReviewId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.userActivity),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserActivityEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.reportedByActivity),
    (0, typeorm_1.JoinColumn)({ name: "reportedByUserId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserActivityEntity.prototype, "reportedByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.reviewedByActivity),
    (0, typeorm_1.JoinColumn)({ name: "reviewedByUserId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserActivityEntity.prototype, "reviewedByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.ProjectEntity, project => project.userActivity),
    (0, typeorm_1.JoinColumn)({ name: "projectId" }),
    __metadata("design:type", project_entity_1.ProjectEntity)
], UserActivityEntity.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_activity_request_entity_1.UserActivityRequestEntity, activityRequest => activityRequest.userActivities),
    (0, typeorm_1.JoinColumn)({ name: "activityRequestId" }),
    __metadata("design:type", user_activity_request_entity_1.UserActivityRequestEntity)
], UserActivityEntity.prototype, "activityRequest", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_working_hours_entity_1.UserWorkingHoursEntity, workingHours => workingHours.userActivities, { cascade: true, onDelete: "CASCADE", nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "workingHoursId" }),
    __metadata("design:type", user_working_hours_entity_1.UserWorkingHoursEntity)
], UserActivityEntity.prototype, "workingHours", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_vacation_assigned_entity_1.UserVacationAssignedEntity, userVacationAssigned => userVacationAssigned.vacations),
    (0, typeorm_1.JoinColumn)({ name: "vacationAssignedId" }),
    __metadata("design:type", user_vacation_assigned_entity_1.UserVacationAssignedEntity)
], UserActivityEntity.prototype, "userVacationAssigned", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_performance_review_entity_1.UserPerformanceReviewEntity, preformanceReview => preformanceReview.activities),
    (0, typeorm_1.JoinColumn)({ name: "performanceReviewId" }),
    __metadata("design:type", user_performance_review_entity_1.UserPerformanceReviewEntity)
], UserActivityEntity.prototype, "performanceReview", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserActivityEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserActivityEntity.prototype, "createdAt", void 0);
exports.UserActivityEntity = UserActivityEntity = __decorate([
    (0, typeorm_1.Entity)("user_activity")
], UserActivityEntity);
//# sourceMappingURL=user-activity.entity.js.map