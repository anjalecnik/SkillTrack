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
exports.UserActivityRequestEntity = void 0;
const constants_1 = require("../../../utils/constants");
const user_activity_status_enum_1 = require("../../../utils/types/enums/user-activity-status.enum");
const user_activity_enum_1 = require("../../../utils/types/enums/user-activity.enum");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const project_entity_1 = require("./project.entity");
const user_activity_entity_1 = require("./user-activity.entity");
let UserActivityRequestEntity = class UserActivityRequestEntity {
    id;
    status;
    activityType;
    description;
    hours;
    dateStart;
    dateEnd;
    location;
    distanceInKM;
    valueInEuro;
    isPaidWithCompanyCard;
    accommodationCost;
    foodCost;
    otherCost;
    userId;
    reportedByUserId;
    reviewedByUserId;
    projectId;
    user;
    reportedByUser;
    reviewedByUser;
    project;
    userActivities;
    updatedAt;
    createdAt;
};
exports.UserActivityRequestEntity = UserActivityRequestEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserActivityRequestEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_32,
        default: user_activity_status_enum_1.UserActivityStatus.PendingApproval
    }),
    __metadata("design:type", String)
], UserActivityRequestEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_32
    }),
    __metadata("design:type", String)
], UserActivityRequestEntity.prototype, "activityType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_1024,
        comment: "Description of activity",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityRequestEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        nullable: true,
        comment: "Hours worked. Used for Daily, BusinessTrip"
    }),
    __metadata("design:type", Object)
], UserActivityRequestEntity.prototype, "hours", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        comment: "Start date of activity"
    }),
    __metadata("design:type", Date)
], UserActivityRequestEntity.prototype, "dateStart", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        comment: "End date of activity",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityRequestEntity.prototype, "dateEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_256,
        comment: "Location of activity",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityRequestEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Distance of businessT trip",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityRequestEntity.prototype, "distanceInKM", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        precision: constants_1.POSTGRES_EXPENSE_VALUE_IN_EURO_PRECISION,
        scale: constants_1.POSTGRES_EXPENSE_VALUE_IN_EURO_SCALE,
        comment: "Value of expense in Eur",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityRequestEntity.prototype, "valueInEuro", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        comment: "Is paid with company card flag",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityRequestEntity.prototype, "isPaidWithCompanyCard", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        precision: constants_1.POSTGRES_EXPENSE_VALUE_IN_EURO_PRECISION,
        scale: constants_1.POSTGRES_EXPENSE_VALUE_IN_EURO_SCALE,
        comment: "Accommodation cost in Euro",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityRequestEntity.prototype, "accommodationCost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        precision: constants_1.POSTGRES_EXPENSE_VALUE_IN_EURO_PRECISION,
        scale: constants_1.POSTGRES_EXPENSE_VALUE_IN_EURO_SCALE,
        comment: "Food cost in Euro",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityRequestEntity.prototype, "foodCost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        precision: constants_1.POSTGRES_EXPENSE_VALUE_IN_EURO_PRECISION,
        scale: constants_1.POSTGRES_EXPENSE_VALUE_IN_EURO_SCALE,
        comment: "Other costs in Euro",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityRequestEntity.prototype, "otherCost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to user"
    }),
    __metadata("design:type", Number)
], UserActivityRequestEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to reporter"
    }),
    __metadata("design:type", Number)
], UserActivityRequestEntity.prototype, "reportedByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to reviewer",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityRequestEntity.prototype, "reviewedByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to project",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserActivityRequestEntity.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.activityRequests),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserActivityRequestEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.reportedActivityRequests),
    (0, typeorm_1.JoinColumn)({ name: "reportedByUserId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserActivityRequestEntity.prototype, "reportedByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.reviewedActivityRequests),
    (0, typeorm_1.JoinColumn)({ name: "reviewedByUserId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserActivityRequestEntity.prototype, "reviewedByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.ProjectEntity, project => project.activityRequests),
    (0, typeorm_1.JoinColumn)({ name: "projectId" }),
    __metadata("design:type", project_entity_1.ProjectEntity)
], UserActivityRequestEntity.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_activity_entity_1.UserActivityEntity, userActivity => userActivity.activityRequest, { cascade: true }),
    __metadata("design:type", Array)
], UserActivityRequestEntity.prototype, "userActivities", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserActivityRequestEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserActivityRequestEntity.prototype, "createdAt", void 0);
exports.UserActivityRequestEntity = UserActivityRequestEntity = __decorate([
    (0, typeorm_1.Entity)("user_activity_request")
], UserActivityRequestEntity);
//# sourceMappingURL=user-activity-request.entity.js.map