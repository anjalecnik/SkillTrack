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
exports.UserBaseResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_status_enum_1 = require("../../../../utils/types/enums/user-status.enum");
const user_role_enum_1 = require("../../../../utils/types/enums/user-role.enum");
class UserBaseResponse {
    id;
    email;
    status;
    role;
    name;
    surname;
    birthDate;
    phone;
}
exports.UserBaseResponse = UserBaseResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserBaseResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "bob.the.builder@gmail.com" }),
    __metadata("design:type", String)
], UserBaseResponse.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: user_status_enum_1.UserStatus.Active, enum: user_status_enum_1.UserStatus }),
    __metadata("design:type", String)
], UserBaseResponse.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: user_role_enum_1.UserRole.User, enum: user_role_enum_1.UserRole }),
    __metadata("design:type", String)
], UserBaseResponse.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Bob" }),
    __metadata("design:type", String)
], UserBaseResponse.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Builder" }),
    __metadata("design:type", String)
], UserBaseResponse.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2000-01-11" }),
    __metadata("design:type", String)
], UserBaseResponse.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "+38641853888" }),
    __metadata("design:type", String)
], UserBaseResponse.prototype, "phone", void 0);
//# sourceMappingURL=user-base.response.js.map