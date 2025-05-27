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
exports.UserShortHalResponse = exports.UserEmbeddedItemsHalResponse = exports.UserEmbeddedWorkPositionItemsHalResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const hal_response_1 = require("./hal.response");
class UserEmbeddedWorkPositionItemsHalResponse extends hal_response_1.HalResourceResponse {
    id;
    name;
}
exports.UserEmbeddedWorkPositionItemsHalResponse = UserEmbeddedWorkPositionItemsHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserEmbeddedWorkPositionItemsHalResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "BE Developer" }),
    __metadata("design:type", String)
], UserEmbeddedWorkPositionItemsHalResponse.prototype, "name", void 0);
class UserEmbeddedItemsHalResponse extends hal_response_1.HalResourceStandardResponse {
    workPosition;
}
exports.UserEmbeddedItemsHalResponse = UserEmbeddedItemsHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserEmbeddedWorkPositionItemsHalResponse }),
    __metadata("design:type", UserEmbeddedWorkPositionItemsHalResponse)
], UserEmbeddedItemsHalResponse.prototype, "workPosition", void 0);
class UserShortHalResponse extends hal_response_1.HalResourceResponse {
    id;
    name;
    surname;
    email;
}
exports.UserShortHalResponse = UserShortHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserShortHalResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Bob" }),
    __metadata("design:type", String)
], UserShortHalResponse.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Builder" }),
    __metadata("design:type", String)
], UserShortHalResponse.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "gmail@gmail.com" }),
    __metadata("design:type", String)
], UserShortHalResponse.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserEmbeddedItemsHalResponse }),
    __metadata("design:type", UserEmbeddedItemsHalResponse)
], UserShortHalResponse.prototype, "_embedded", void 0);
//# sourceMappingURL=user-short-hal.response.js.map