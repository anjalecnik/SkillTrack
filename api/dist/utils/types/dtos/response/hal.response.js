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
exports.HalResourceResponse = exports.HalResourcePaginationResponse = exports.HalResourceStandardResponse = exports.HalLinksResponse = exports.HalLinksPaginationResponse = exports.HalLinkResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const paginated_meta_response_1 = require("./paginated-meta.response");
class HalLinkResponse {
    href;
    templated;
    type;
    deprecation;
    name;
    profile;
    title;
    hreflang;
}
exports.HalLinkResponse = HalLinkResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "/api/resource" }),
    __metadata("design:type", String)
], HalLinkResponse.prototype, "href", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Boolean, example: false }),
    __metadata("design:type", Boolean)
], HalLinkResponse.prototype, "templated", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "type" }),
    __metadata("design:type", String)
], HalLinkResponse.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "deprecation" }),
    __metadata("design:type", String)
], HalLinkResponse.prototype, "deprecation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "name" }),
    __metadata("design:type", String)
], HalLinkResponse.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "profile" }),
    __metadata("design:type", String)
], HalLinkResponse.prototype, "profile", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "title" }),
    __metadata("design:type", String)
], HalLinkResponse.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "hreflang" }),
    __metadata("design:type", String)
], HalLinkResponse.prototype, "hreflang", void 0);
class HalLinksPaginationResponse {
    self;
    first;
    last;
    next;
    previous;
    find;
}
exports.HalLinksPaginationResponse = HalLinksPaginationResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ type: HalLinkResponse }),
    __metadata("design:type", HalLinkResponse)
], HalLinksPaginationResponse.prototype, "self", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: HalLinkResponse }),
    __metadata("design:type", HalLinkResponse)
], HalLinksPaginationResponse.prototype, "first", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: HalLinkResponse }),
    __metadata("design:type", HalLinkResponse)
], HalLinksPaginationResponse.prototype, "last", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: HalLinkResponse }),
    __metadata("design:type", HalLinkResponse)
], HalLinksPaginationResponse.prototype, "next", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: HalLinkResponse }),
    __metadata("design:type", HalLinkResponse)
], HalLinksPaginationResponse.prototype, "previous", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: HalLinkResponse }),
    __metadata("design:type", HalLinkResponse)
], HalLinksPaginationResponse.prototype, "find", void 0);
class HalLinksResponse {
    self;
}
exports.HalLinksResponse = HalLinksResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ type: HalLinkResponse }),
    __metadata("design:type", HalLinkResponse)
], HalLinksResponse.prototype, "self", void 0);
class HalResourceStandardResponse {
    _links;
    _embedded;
}
exports.HalResourceStandardResponse = HalResourceStandardResponse;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: HalLinksResponse }),
    __metadata("design:type", Object)
], HalResourceStandardResponse.prototype, "_links", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: HalResourceStandardResponse
    }),
    __metadata("design:type", Object)
], HalResourceStandardResponse.prototype, "_embedded", void 0);
class HalResourcePaginationResponse extends paginated_meta_response_1.PaginatedMetaResponse {
    _links;
    _embedded;
}
exports.HalResourcePaginationResponse = HalResourcePaginationResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ type: HalLinksPaginationResponse }),
    __metadata("design:type", HalLinksPaginationResponse)
], HalResourcePaginationResponse.prototype, "_links", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: HalResourceStandardResponse
    }),
    __metadata("design:type", Object)
], HalResourcePaginationResponse.prototype, "_embedded", void 0);
class HalResourceResponse extends HalResourceStandardResponse {
}
exports.HalResourceResponse = HalResourceResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ type: HalLinksResponse }),
    __metadata("design:type", Object)
], HalResourceResponse.prototype, "_links", void 0);
//# sourceMappingURL=hal.response.js.map