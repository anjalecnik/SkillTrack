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
exports.AuthUserLocalLoginRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../../../utils/constants");
class AuthUserLocalLoginRequest {
    email;
    password;
}
exports.AuthUserLocalLoginRequest = AuthUserLocalLoginRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "bob.the.builder@gmail.com" }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(constants_1.DB_VARCHAR_LENGTH_4),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_64),
    __metadata("design:type", String)
], AuthUserLocalLoginRequest.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "mySuperSecretPassword" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(constants_1.DB_VARCHAR_LENGTH_8),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_32),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*:;/<>?~_-])(?=.{10,})/, {
        message: "Password is too weak!"
    }),
    __metadata("design:type", String)
], AuthUserLocalLoginRequest.prototype, "password", void 0);
//# sourceMappingURL=auth-user-local-login.request.js.map