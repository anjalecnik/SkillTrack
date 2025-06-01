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
exports.UserWorkingHoursEntity = void 0;
const constants_1 = require("../../../utils/constants");
const user_working_hours_enum_1 = require("../../../utils/types/enums/user-working-hours.enum");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const user_activity_entity_1 = require("./user-activity.entity");
let UserWorkingHoursEntity = class UserWorkingHoursEntity {
    id;
    type;
    fromDateStart;
    toDateEnd;
    userId;
    user;
    userActivities;
};
exports.UserWorkingHoursEntity = UserWorkingHoursEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserWorkingHoursEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_32
    }),
    __metadata("design:type", String)
], UserWorkingHoursEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp"
    }),
    __metadata("design:type", Date)
], UserWorkingHoursEntity.prototype, "fromDateStart", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserWorkingHoursEntity.prototype, "toDateEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user"
    }),
    __metadata("design:type", Number)
], UserWorkingHoursEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.workingHours),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserWorkingHoursEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_activity_entity_1.UserActivityEntity, activity => activity.workingHours),
    __metadata("design:type", user_activity_entity_1.UserActivityEntity)
], UserWorkingHoursEntity.prototype, "userActivities", void 0);
exports.UserWorkingHoursEntity = UserWorkingHoursEntity = __decorate([
    (0, typeorm_1.Entity)("user_working_hours")
], UserWorkingHoursEntity);
//# sourceMappingURL=user-working-hours.entity.js.map