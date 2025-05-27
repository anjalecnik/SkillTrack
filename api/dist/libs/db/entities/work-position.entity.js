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
exports.WorkPositionEntity = void 0;
const work_position_enum_1 = require("../../../utils/types/enums/work-position.enum");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const constants_1 = require("../../../utils/constants");
let WorkPositionEntity = class WorkPositionEntity {
    id;
    name;
    level;
    description;
    workPositionPromotionId;
    createdByUserId;
    updatedByUserId;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
    user;
    parentWorkPosition;
    childWorkPosition;
};
exports.WorkPositionEntity = WorkPositionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkPositionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_128
    }),
    __metadata("design:type", String)
], WorkPositionEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_4
    }),
    __metadata("design:type", String)
], WorkPositionEntity.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_256
    }),
    __metadata("design:type", String)
], WorkPositionEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the work position promotion",
        nullable: true
    }),
    __metadata("design:type", Object)
], WorkPositionEntity.prototype, "workPositionPromotionId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user who created work position"
    }),
    __metadata("design:type", Number)
], WorkPositionEntity.prototype, "createdByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user who updated work position"
    }),
    __metadata("design:type", Number)
], WorkPositionEntity.prototype, "updatedByUserId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WorkPositionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WorkPositionEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.workPositionCreatedBy),
    (0, typeorm_1.JoinColumn)({ name: "createdByUserId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], WorkPositionEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.workPositionUpdatedBy),
    (0, typeorm_1.JoinColumn)({ name: "updatedByUserId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], WorkPositionEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.UserEntity, user => user.workPosition, { cascade: true }),
    __metadata("design:type", Array)
], WorkPositionEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => WorkPositionEntity, workPosition => workPosition.childWorkPosition, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "workPositionPromotionId" }),
    __metadata("design:type", WorkPositionEntity)
], WorkPositionEntity.prototype, "parentWorkPosition", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => WorkPositionEntity, workPosition => workPosition.parentWorkPosition, { nullable: true }),
    __metadata("design:type", Array)
], WorkPositionEntity.prototype, "childWorkPosition", void 0);
exports.WorkPositionEntity = WorkPositionEntity = __decorate([
    (0, typeorm_1.Entity)("work_position"),
    (0, typeorm_1.Unique)(["name", "level"])
], WorkPositionEntity);
//# sourceMappingURL=work-position.entity.js.map