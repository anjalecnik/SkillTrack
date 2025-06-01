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
exports.UserPersonalInfoRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../../../utils/constants");
class UserPersonalInfoRequest {
    name;
    surname;
    birthDate;
    phone;
}
exports.UserPersonalInfoRequest = UserPersonalInfoRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Joe" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_128),
    __metadata("design:type", String)
], UserPersonalInfoRequest.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Mishica" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_128),
    __metadata("design:type", String)
], UserPersonalInfoRequest.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2023-05-15" }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UserPersonalInfoRequest.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "+38641853888" }),
    (0, class_validator_1.IsPhoneNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserPersonalInfoRequest.prototype, "phone", void 0);
//# sourceMappingURL=user-personal-info.request.js.map