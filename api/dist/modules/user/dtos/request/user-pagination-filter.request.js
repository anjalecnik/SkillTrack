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
exports.UserPaginationFilterRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_transformer_2 = require("../../../../utils/class-transformer");
const dtos_1 = require("../../../../utils/types/dtos");
const user_status_enum_1 = require("../../../../utils/types/enums/user-status.enum");
const interfaces_1 = require("../../interfaces");
class UserPaginationFilterRequest extends dtos_1.PaginationPropsRequest {
    ids;
    statuses;
    fullName;
    sort = "id";
    metadata;
}
exports.UserPaginationFilterRequest = UserPaginationFilterRequest;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsPositive)({ each: true }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UserPaginationFilterRequest.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: user_status_enum_1.UserStatus.Active }),
    (0, class_validator_1.IsEnum)(user_status_enum_1.UserStatus, { each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseParamArray)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UserPaginationFilterRequest.prototype, "statuses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Bob" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserPaginationFilterRequest.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "id" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(interfaces_1.sortingFieldUserValidationArray),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserPaginationFilterRequest.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_2.ParseOptionalBoolean)(),
    __metadata("design:type", Boolean)
], UserPaginationFilterRequest.prototype, "metadata", void 0);
//# sourceMappingURL=user-pagination-filter.request.js.map