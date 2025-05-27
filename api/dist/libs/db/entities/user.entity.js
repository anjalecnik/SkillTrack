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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const user_status_enum_1 = require("../../../utils/types/enums/user-status.enum");
const constants_1 = require("../../../utils/constants");
const user_role_enum_1 = require("../../../utils/types/enums/user-role.enum");
const team_entity_1 = require("./team.entity");
const work_position_entity_1 = require("./work-position.entity");
const user_activity_entity_1 = require("./user-activity.entity");
const project_user_entity_1 = require("./project-user.entity");
const project_entity_1 = require("./project.entity");
const user_activity_request_entity_1 = require("./user-activity-request.entity");
const user_address_entity_1 = require("./user-address.entity");
const user_vacation_assigned_entity_1 = require("./user-vacation-assigned.entity");
const user_working_hours_entity_1 = require("./user-working-hours.entity");
const user_performance_review_entity_1 = require("./user-performance-review.entity");
const notification_entity_1 = require("./notification.entity");
let UserEntity = class UserEntity {
    id;
    email;
    password;
    status;
    role;
    name;
    surname;
    birthDate;
    phone;
    createdAt;
    updatedAt;
    deletedAt;
    teamId;
    workPositionId;
    managerId;
    invitedByUserId;
    updatedByUserId;
    deletedByUserId;
    team;
    workPosition;
    workPositionCreatedBy;
    workPositionUpdatedBy;
    manager;
    subordinates;
    invitedByUser;
    childInvitedByUsers;
    updatedByUser;
    childUpdatedByUsers;
    deletedByUser;
    childDeletedByUsers;
    userActivity;
    reportedByActivity;
    reviewedByActivity;
    notifications;
    projects;
    createdProjects;
    updatedProjects;
    deletedProjects;
    activityRequests;
    reportedActivityRequests;
    reviewedActivityRequests;
    addresses;
    createdAddresses;
    updatedAddresses;
    deletedAddresses;
    assignedVacations;
    createdAssignedVacations;
    updatedAssignedVacations;
    workingHours;
    performanceReviews;
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_256,
        unique: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_512,
        nullable: true
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_16
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_16,
        default: user_role_enum_1.UserRole.User
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_128
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_128
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_16,
        nullable: true
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Object)
], UserEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the team",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "teamId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the work position",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "workPositionId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user who is manager",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "managerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user who invited user",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "invitedByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user who updated user",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "updatedByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user who deleted user",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "deletedByUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.TeamEntity, team => team.user),
    (0, typeorm_1.JoinColumn)({ name: "teamId" }),
    __metadata("design:type", team_entity_1.TeamEntity)
], UserEntity.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_position_entity_1.WorkPositionEntity, position => position.user),
    (0, typeorm_1.JoinColumn)({ name: "workPositionId" }),
    __metadata("design:type", work_position_entity_1.WorkPositionEntity)
], UserEntity.prototype, "workPosition", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => work_position_entity_1.WorkPositionEntity, position => position.createdBy),
    __metadata("design:type", Array)
], UserEntity.prototype, "workPositionCreatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => work_position_entity_1.WorkPositionEntity, position => position.updatedBy),
    __metadata("design:type", Array)
], UserEntity.prototype, "workPositionUpdatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity, user => user.subordinates),
    (0, typeorm_1.JoinColumn)({ name: "managerId" }),
    __metadata("design:type", UserEntity)
], UserEntity.prototype, "manager", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserEntity, user => user.manager),
    __metadata("design:type", Array)
], UserEntity.prototype, "subordinates", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity, user => user.childInvitedByUsers),
    (0, typeorm_1.JoinColumn)({ name: "invitedByUserId" }),
    __metadata("design:type", UserEntity)
], UserEntity.prototype, "invitedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserEntity, user => user.invitedByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "childInvitedByUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity, user => user.childUpdatedByUsers),
    (0, typeorm_1.JoinColumn)({ name: "updatedByUserId" }),
    __metadata("design:type", UserEntity)
], UserEntity.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserEntity, user => user.updatedByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "childUpdatedByUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity, user => user.childDeletedByUsers),
    (0, typeorm_1.JoinColumn)({ name: "deletedByUserId" }),
    __metadata("design:type", UserEntity)
], UserEntity.prototype, "deletedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserEntity, user => user.deletedByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "childDeletedByUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_activity_entity_1.UserActivityEntity, userActivity => userActivity.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "userActivity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_activity_entity_1.UserActivityEntity, userActivity => userActivity.reportedByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "reportedByActivity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_activity_entity_1.UserActivityEntity, userActivity => userActivity.reviewedByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "reviewedByActivity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.NotificationEntity, notification => notification.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_user_entity_1.ProjectUserEntity, projectUser => projectUser.user, { cascade: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "projects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.ProjectEntity, project => project.createdByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "createdProjects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.ProjectEntity, project => project.updatedByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "updatedProjects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.ProjectEntity, project => project.deletedByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "deletedProjects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_activity_request_entity_1.UserActivityRequestEntity, activityRequest => activityRequest.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "activityRequests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_activity_request_entity_1.UserActivityRequestEntity, activityRequest => activityRequest.reportedByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "reportedActivityRequests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_activity_request_entity_1.UserActivityRequestEntity, activityRequest => activityRequest.reviewedByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "reviewedActivityRequests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_address_entity_1.UserAddressEntity, addresses => addresses.user, { cascade: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "addresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_address_entity_1.UserAddressEntity, addresses => addresses.createdByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "createdAddresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_address_entity_1.UserAddressEntity, addresses => addresses.updatedByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "updatedAddresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_address_entity_1.UserAddressEntity, addresses => addresses.deletedByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "deletedAddresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_vacation_assigned_entity_1.UserVacationAssignedEntity, userVacationAssigned => userVacationAssigned.user, { cascade: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "assignedVacations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_vacation_assigned_entity_1.UserVacationAssignedEntity, userVacationAssigned => userVacationAssigned.createdByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "createdAssignedVacations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_vacation_assigned_entity_1.UserVacationAssignedEntity, userVacationAssigned => userVacationAssigned.updatedByUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "updatedAssignedVacations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_working_hours_entity_1.UserWorkingHoursEntity, workingHours => workingHours.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "workingHours", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_performance_review_entity_1.UserPerformanceReviewEntity, userPerformanceReview => userPerformanceReview.user, { cascade: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "performanceReviews", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)("user"),
    (0, typeorm_1.Unique)("user_uq", ["email"])
], UserEntity);
//# sourceMappingURL=user.entity.js.map