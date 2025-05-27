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
exports.UserAddressDetailsResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_address_enum_1 = require("../../../../../../utils/types/enums/user-address.enum");
class UserAddressDetailsResponse {
    id;
    streetAddress;
    city;
    state;
    postalCode;
    countryCode;
    type;
}
exports.UserAddressDetailsResponse = UserAddressDetailsResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserAddressDetailsResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Vrbanska cesta 26a" }),
    __metadata("design:type", String)
], UserAddressDetailsResponse.prototype, "streetAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Maribor" }),
    __metadata("design:type", String)
], UserAddressDetailsResponse.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Stajerska" }),
    __metadata("design:type", String)
], UserAddressDetailsResponse.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2000" }),
    __metadata("design:type", String)
], UserAddressDetailsResponse.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "SI" }),
    __metadata("design:type", String)
], UserAddressDetailsResponse.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: user_address_enum_1.UserAddressType.Main }),
    __metadata("design:type", String)
], UserAddressDetailsResponse.prototype, "type", void 0);
//# sourceMappingURL=user-address-details.response.js.map