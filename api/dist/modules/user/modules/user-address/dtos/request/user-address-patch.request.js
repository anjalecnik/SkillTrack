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
exports.UserAddressPatchRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../../../../../utils/constants");
const user_address_enum_1 = require("../../../../../../utils/types/enums/user-address.enum");
class UserAddressPatchRequest {
    id;
    streetAddress;
    city;
    state;
    postalCode;
    countryCode;
    type;
}
exports.UserAddressPatchRequest = UserAddressPatchRequest;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UserAddressPatchRequest.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Vrbanska cesta 26a" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_256),
    __metadata("design:type", String)
], UserAddressPatchRequest.prototype, "streetAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Maribor" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_128),
    __metadata("design:type", String)
], UserAddressPatchRequest.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Stajerska" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_128),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserAddressPatchRequest.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2000" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_16),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserAddressPatchRequest.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "SI" }),
    (0, class_validator_1.IsISO31661Alpha2)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_2),
    __metadata("design:type", String)
], UserAddressPatchRequest.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: user_address_enum_1.UserAddressType.Main, default: user_address_enum_1.UserAddressType.Main }),
    (0, class_validator_1.IsEnum)(user_address_enum_1.UserAddressType),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_16),
    __metadata("design:type", String)
], UserAddressPatchRequest.prototype, "type", void 0);
//# sourceMappingURL=user-address-patch.request.js.map