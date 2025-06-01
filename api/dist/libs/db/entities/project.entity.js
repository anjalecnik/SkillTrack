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
exports.ProjectEntity = void 0;
const constants_1 = require("../../../utils/constants");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const user_activity_entity_1 = require("./user-activity.entity");
const project_user_entity_1 = require("./project-user.entity");
const user_activity_request_entity_1 = require("./user-activity-request.entity");
let ProjectEntity = class ProjectEntity {
    id;
    name;
    type;
    dateStart;
    dateEnd;
    createdAt;
    updatedAt;
    deletedAt;
    createdByUserId;
    updatedByUserId;
    deletedByUserId;
    createdByUser;
    updatedByUser;
    deletedByUser;
    users;
    userActivity;
    activityRequests;
};
exports.ProjectEntity = ProjectEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProjectEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_64
    }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_32,
        nullable: true
    }),
    __metadata("design:type", Object)
], ProjectEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp"
    }),
    __metadata("design:type", Date)
], ProjectEntity.prototype, "dateStart", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Object)
], ProjectEntity.prototype, "dateEnd", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProjectEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProjectEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Object)
], ProjectEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user who created project"
    }),
    __metadata("design:type", Number)
], ProjectEntity.prototype, "createdByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user who updated project"
    }),
    __metadata("design:type", Number)
], ProjectEntity.prototype, "updatedByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user who deleted project",
        nullable: true
    }),
    __metadata("design:type", Object)
], ProjectEntity.prototype, "deletedByUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.createdProjects),
    (0, typeorm_1.JoinColumn)({ name: "createdByUserId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], ProjectEntity.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.updatedProjects),
    (0, typeorm_1.JoinColumn)({ name: "updatedByUserId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], ProjectEntity.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.deletedProjects),
    (0, typeorm_1.JoinColumn)({ name: "deletedByUserId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], ProjectEntity.prototype, "deletedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_user_entity_1.ProjectUserEntity, projectUser => projectUser.project, { cascade: true }),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_activity_entity_1.UserActivityEntity, userActivity => userActivity.project),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "userActivity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_activity_request_entity_1.UserActivityRequestEntity, activityRequest => activityRequest.project, { cascade: true }),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "activityRequests", void 0);
exports.ProjectEntity = ProjectEntity = __decorate([
    (0, typeorm_1.Entity)("project")
], ProjectEntity);
//# sourceMappingURL=project.entity.js.map