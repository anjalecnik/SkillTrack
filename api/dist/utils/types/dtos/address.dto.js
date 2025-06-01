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
exports.AddressDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../constants");
class AddressDataDto {
    streetAddress;
    city;
    state;
    postalCode;
    countryCode;
}
exports.AddressDataDto = AddressDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Vrbanska cesta 26a" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_256),
    __metadata("design:type", String)
], AddressDataDto.prototype, "streetAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Maribor" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_128),
    __metadata("design:type", String)
], AddressDataDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Stajerska" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_128),
    __metadata("design:type", Object)
], AddressDataDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2000" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_16),
    __metadata("design:type", Object)
], AddressDataDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "SI" }),
    (0, class_validator_1.IsISO31661Alpha2)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_2),
    __metadata("design:type", String)
], AddressDataDto.prototype, "countryCode", void 0);
//# sourceMappingURL=address.dto.js.map