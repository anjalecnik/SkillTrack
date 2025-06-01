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
exports.UserWorkingHoursResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_working_hours_enum_1 = require("../../../../../../utils/types/enums/user-working-hours.enum");
class UserWorkingHoursResponse {
    type;
    fromDateStart;
    toDateEnd;
    projectId;
}
exports.UserWorkingHoursResponse = UserWorkingHoursResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: user_working_hours_enum_1.UserWorkingHoursType.Work }),
    __metadata("design:type", String)
], UserWorkingHoursResponse.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2000-01-01T07:58:10.085Z" }),
    __metadata("design:type", Date)
], UserWorkingHoursResponse.prototype, "fromDateStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2000-01-01T07:58:10.085Z" }),
    __metadata("design:type", Object)
], UserWorkingHoursResponse.prototype, "toDateEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2000-01-01T07:58:10.085Z" }),
    __metadata("design:type", Number)
], UserWorkingHoursResponse.prototype, "projectId", void 0);
//# sourceMappingURL=user-working-hours.response.js.map