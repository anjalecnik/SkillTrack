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
exports.ProjectUserEntity = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../../../utils/constants");
const project_user_role_enum_1 = require("../../../utils/types/enums/project-user-role.enum");
const project_entity_1 = require("./project.entity");
const user_entity_1 = require("./user.entity");
let ProjectUserEntity = class ProjectUserEntity {
    id;
    role;
    assignedPercentage;
    createdAt;
    deletedAt;
    projectId;
    userId;
    project;
    user;
};
exports.ProjectUserEntity = ProjectUserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProjectUserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_32
    }),
    __metadata("design:type", String)
], ProjectUserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        default: 100
    }),
    __metadata("design:type", Number)
], ProjectUserEntity.prototype, "assignedPercentage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProjectUserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Object)
], ProjectUserEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to project"
    }),
    __metadata("design:type", Number)
], ProjectUserEntity.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to user"
    }),
    __metadata("design:type", Number)
], ProjectUserEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.ProjectEntity, project => project.users, { orphanedRowAction: "soft-delete" }),
    (0, typeorm_1.JoinColumn)({ name: "projectId" }),
    __metadata("design:type", project_entity_1.ProjectEntity)
], ProjectUserEntity.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.projects, { orphanedRowAction: "soft-delete" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], ProjectUserEntity.prototype, "user", void 0);
exports.ProjectUserEntity = ProjectUserEntity = __decorate([
    (0, typeorm_1.Entity)("project_jt_user"),
    (0, typeorm_1.Index)(["projectId", "userId"], { unique: true, where: '"deletedAt" IS NULL' })
], ProjectUserEntity);
//# sourceMappingURL=project-user.entity.js.map