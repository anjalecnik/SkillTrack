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
exports.UserActivityStatisticResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_sick_leave_statistic_response_1 = require("./user-sick-leave-statistic.response");
const user_vacation_statistic_response_1 = require("./user-vacation-statistic.response");
class UserActivityStatisticResponse {
    activeRequestCount;
    vacation;
    sickLeave;
}
exports.UserActivityStatisticResponse = UserActivityStatisticResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Currently active requests", example: 1 }),
    __metadata("design:type", Number)
], UserActivityStatisticResponse.prototype, "activeRequestCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: user_vacation_statistic_response_1.UserVacationStatisticResponse }),
    __metadata("design:type", user_vacation_statistic_response_1.UserVacationStatisticResponse)
], UserActivityStatisticResponse.prototype, "vacation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_sick_leave_statistic_response_1.UserSickLeaveStatisticResponse }),
    __metadata("design:type", user_sick_leave_statistic_response_1.UserSickLeaveStatisticResponse)
], UserActivityStatisticResponse.prototype, "sickLeave", void 0);
//# sourceMappingURL=user-activity-statistic.response.js.map