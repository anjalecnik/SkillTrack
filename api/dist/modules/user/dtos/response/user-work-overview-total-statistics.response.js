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
exports.TotalStatistics = void 0;
const swagger_1 = require("@nestjs/swagger");
class TotalStatistics {
    usersCount;
    workDays;
    daysOnProjectSum;
    daysOffProjectSum;
    dailyActivitySum;
    businessTripSum;
    publicHolidaysSum;
    sickLeaveSum;
    vacationSum;
}
exports.TotalStatistics = TotalStatistics;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total count of users" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "usersCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total number of work days" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "workDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Sum of days on project for all users" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "daysOnProjectSum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Sum of days off project for all users" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "daysOffProjectSum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Sum of daily activities for all users" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "dailyActivitySum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Sum of business trips for all users" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "businessTripSum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Sum of public holidays for all users" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "publicHolidaysSum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Sum of sick leave instances for all users" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "sickLeaveSum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Sum of vacation instances for all users" }),
    __metadata("design:type", Number)
], TotalStatistics.prototype, "vacationSum", void 0);
//# sourceMappingURL=user-work-overview-total-statistics.response.js.map