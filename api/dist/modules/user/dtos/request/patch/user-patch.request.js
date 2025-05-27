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
exports.UserPatchRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../../../../utils/constants");
const user_status_enum_1 = require("../../../../../utils/types/enums/user-status.enum");
const user_project_patch_request_1 = require("./user-project-patch.request");
const user_address_patch_request_1 = require("../../../modules/user-address/dtos/request/user-address-patch.request");
const user_assigned_vacation_patch_request_1 = require("../../../modules/user-assigned-vacation/dtos/request/user-assigned-vacation-patch.request");
class UserPatchRequest {
    name;
    surname;
    birthDate;
    phone;
    teamId;
    workPositionId;
    managerId;
    addresses;
    projects;
    assignedVacations;
    status;
}
exports.UserPatchRequest = UserPatchRequest;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Joe" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_128),
    __metadata("design:type", String)
], UserPatchRequest.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Mishica" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(constants_1.DB_VARCHAR_LENGTH_128),
    __metadata("design:type", String)
], UserPatchRequest.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2023-05-15" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinDate)(new Date("1900-01-01")),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UserPatchRequest.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "+38641853888" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], UserPatchRequest.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UserPatchRequest.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UserPatchRequest.prototype, "workPositionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 8 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UserPatchRequest.prototype, "managerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: user_address_patch_request_1.UserAddressPatchRequest, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => user_address_patch_request_1.UserAddressPatchRequest),
    __metadata("design:type", Array)
], UserPatchRequest.prototype, "addresses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: user_project_patch_request_1.UserProjectPatchRequest, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => user_project_patch_request_1.UserProjectPatchRequest),
    __metadata("design:type", Array)
], UserPatchRequest.prototype, "projects", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: user_assigned_vacation_patch_request_1.UserAssignedVacationPatchRequest, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => user_assigned_vacation_patch_request_1.UserAssignedVacationPatchRequest),
    __metadata("design:type", Array)
], UserPatchRequest.prototype, "assignedVacations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: user_status_enum_1.UserStatus.Active }),
    (0, class_validator_1.IsEnum)(user_status_enum_1.UserStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserPatchRequest.prototype, "status", void 0);
//# sourceMappingURL=user-patch.request.js.map