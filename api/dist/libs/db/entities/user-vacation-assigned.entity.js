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
exports.UserVacationAssignedEntity = void 0;
const constants_1 = require("../../../utils/constants");
const typeorm_1 = require("typeorm");
const date_transformer_helper_1 = require("../helpers/date-transformer.helper");
const user_activity_entity_1 = require("./user-activity.entity");
const user_entity_1 = require("./user.entity");
let UserVacationAssignedEntity = class UserVacationAssignedEntity {
    id;
    year;
    assignedDays;
    description;
    oldVacationExpiration;
    initialUsedDays;
    initialDate;
    createdAt;
    updatedAt;
    userId;
    createdByUserId;
    updatedByUserId;
    vacations;
    user;
    createdByUser;
    updatedByUser;
};
exports.UserVacationAssignedEntity = UserVacationAssignedEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserVacationAssignedEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer"
    }),
    __metadata("design:type", Number)
], UserVacationAssignedEntity.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Assigned vacation days for the year",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserVacationAssignedEntity.prototype, "assignedDays", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_128,
        comment: "Description for assigned vacation",
        nullable: true
    }),
    __metadata("design:type", String)
], UserVacationAssignedEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_5,
        comment: "Expiration date of old vacation in MM-DD format",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserVacationAssignedEntity.prototype, "oldVacationExpiration", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Used vacation days for the year. If not null this property flags assigned vacation as initial",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserVacationAssignedEntity.prototype, "initialUsedDays", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "date",
        transformer: date_transformer_helper_1.DateTransformerHelper,
        nullable: true
    }),
    __metadata("design:type", Object)
], UserVacationAssignedEntity.prototype, "initialDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserVacationAssignedEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserVacationAssignedEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user"
    }),
    __metadata("design:type", Number)
], UserVacationAssignedEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user who created assigned Vacation",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserVacationAssignedEntity.prototype, "createdByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user who updated assigned Vacation",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserVacationAssignedEntity.prototype, "updatedByUserId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_activity_entity_1.UserActivityEntity, userActivity => userActivity.userVacationAssigned),
    __metadata("design:type", Array)
], UserVacationAssignedEntity.prototype, "vacations", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.assignedVacations),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserVacationAssignedEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.createdAssignedVacations),
    (0, typeorm_1.JoinColumn)({ name: "createdByUserId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserVacationAssignedEntity.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.updatedAssignedVacations),
    (0, typeorm_1.JoinColumn)({ name: "updatedByWorkspaceUserId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserVacationAssignedEntity.prototype, "updatedByUser", void 0);
exports.UserVacationAssignedEntity = UserVacationAssignedEntity = __decorate([
    (0, typeorm_1.Entity)("user_vacation_assigned"),
    (0, typeorm_1.Unique)(["userId", "year"])
], UserVacationAssignedEntity);
//# sourceMappingURL=user-vacation-assigned.entity.js.map