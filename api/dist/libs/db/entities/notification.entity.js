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
exports.NotificationEntity = void 0;
const constants_1 = require("../../../utils/constants");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const notification_status_enum_1 = require("../../../utils/types/enums/notification-status.enum");
const notficiation_enum_1 = require("../../../utils/types/enums/notficiation.enum");
const user_activity_request_entity_1 = require("./user-activity-request.entity");
let NotificationEntity = class NotificationEntity {
    id;
    sendSchedule;
    scheduledJobName;
    status;
    type;
    errorMessage;
    createdAt;
    updatedAt;
    userId;
    userActivityRequestId;
    user;
    userActivityRequest;
};
exports.NotificationEntity = NotificationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NotificationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_256,
        nullable: true,
        comment: "Cronjob expression. If empty, process immediately"
    }),
    __metadata("design:type", Object)
], NotificationEntity.prototype, "sendSchedule", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_256,
        nullable: true,
        comment: "Used only for cron jobs"
    }),
    __metadata("design:type", Object)
], NotificationEntity.prototype, "scheduledJobName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_32,
        default: notification_status_enum_1.NotificationStatus.Pending
    }),
    __metadata("design:type", String)
], NotificationEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_32
    }),
    __metadata("design:type", String)
], NotificationEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_1024,
        nullable: true
    }),
    __metadata("design:type", Object)
], NotificationEntity.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], NotificationEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], NotificationEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user",
        nullable: true
    }),
    __metadata("design:type", Object)
], NotificationEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user activity request",
        nullable: true
    }),
    __metadata("design:type", Object)
], NotificationEntity.prototype, "userActivityRequestId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.notifications, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], NotificationEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_activity_request_entity_1.UserActivityRequestEntity, userActivityRequest => userActivityRequest.notifications, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "userActivityRequestId" }),
    __metadata("design:type", user_activity_request_entity_1.UserActivityRequestEntity)
], NotificationEntity.prototype, "userActivityRequest", void 0);
exports.NotificationEntity = NotificationEntity = __decorate([
    (0, typeorm_1.Entity)("notification")
], NotificationEntity);
//# sourceMappingURL=notification.entity.js.map