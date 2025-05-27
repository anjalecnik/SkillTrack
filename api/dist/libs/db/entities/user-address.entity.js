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
exports.UserAddressEntity = void 0;
const constants_1 = require("../../../utils/constants");
const typeorm_1 = require("typeorm");
const user_address_enum_1 = require("../../../utils/types/enums/user-address.enum");
const user_entity_1 = require("./user.entity");
let UserAddressEntity = class UserAddressEntity {
    id;
    streetAddress;
    city;
    state;
    postalCode;
    countryCode;
    type;
    userId;
    createdByUserId;
    updatedByUserId;
    deletedByUserId;
    createdAt;
    updatedAt;
    deletedAt;
    user;
    createdByUser;
    updatedByUser;
    deletedByUser;
};
exports.UserAddressEntity = UserAddressEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserAddressEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_256
    }),
    __metadata("design:type", String)
], UserAddressEntity.prototype, "streetAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_128
    }),
    __metadata("design:type", String)
], UserAddressEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_128,
        nullable: true
    }),
    __metadata("design:type", Object)
], UserAddressEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_16,
        nullable: true
    }),
    __metadata("design:type", Object)
], UserAddressEntity.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "char",
        length: constants_1.DB_VARCHAR_LENGTH_2
    }),
    __metadata("design:type", String)
], UserAddressEntity.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: constants_1.DB_VARCHAR_LENGTH_16,
        default: user_address_enum_1.UserAddressType.Main
    }),
    __metadata("design:type", String)
], UserAddressEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to user"
    }),
    __metadata("design:type", Number)
], UserAddressEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user who created user address"
    }),
    __metadata("design:type", Number)
], UserAddressEntity.prototype, "createdByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user who updated user address"
    }),
    __metadata("design:type", Number)
], UserAddressEntity.prototype, "updatedByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        comment: "Quick reference to the user who deleted user address",
        nullable: true
    }),
    __metadata("design:type", Object)
], UserAddressEntity.prototype, "deletedByUserId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserAddressEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserAddressEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Object)
], UserAddressEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.addresses, { orphanedRowAction: "soft-delete" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserAddressEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.createdAddresses),
    (0, typeorm_1.JoinColumn)({ name: "createdByUserId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserAddressEntity.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.updatedAddresses),
    (0, typeorm_1.JoinColumn)({ name: "updatedByUserId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserAddressEntity.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.deletedAddresses),
    (0, typeorm_1.JoinColumn)({ name: "deletedByUserId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserAddressEntity.prototype, "deletedByUser", void 0);
exports.UserAddressEntity = UserAddressEntity = __decorate([
    (0, typeorm_1.Entity)("user_address")
], UserAddressEntity);
//# sourceMappingURL=user-address.entity.js.map