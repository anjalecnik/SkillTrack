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
exports.UserWorkingHoursListItemResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../../../../../../utils/types/dtos");
const user_working_hours_enum_1 = require("../../../../../../utils/types/enums/user-working-hours.enum");
class UserWorkingHoursListItemResponse {
    id;
    type;
    fromDateStart;
    toDateEnd;
    projectName;
    projectId;
}
exports.UserWorkingHoursListItemResponse = UserWorkingHoursListItemResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserWorkingHoursListItemResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: user_working_hours_enum_1.UserWorkingHoursType.Work }),
    __metadata("design:type", String)
], UserWorkingHoursListItemResponse.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: dtos_1.DateTimeWithoutTimezoneResponse }),
    __metadata("design:type", dtos_1.DateTimeWithoutTimezoneResponse)
], UserWorkingHoursListItemResponse.prototype, "fromDateStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: dtos_1.DateTimeWithoutTimezoneResponse }),
    __metadata("design:type", dtos_1.DateTimeWithoutTimezoneResponse)
], UserWorkingHoursListItemResponse.prototype, "toDateEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Kr en projekt" }),
    __metadata("design:type", Object)
], UserWorkingHoursListItemResponse.prototype, "projectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Object)
], UserWorkingHoursListItemResponse.prototype, "projectId", void 0);
//# sourceMappingURL=user-working-hours-list-item.response.js.map