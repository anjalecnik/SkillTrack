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
exports.OverviewMonthlyProductivityResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class OverviewMonthlyProductivityResponse {
    thisYear;
    lastYear;
}
exports.OverviewMonthlyProductivityResponse = OverviewMonthlyProductivityResponse;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: [120, 135, 150],
        description: "Monthly productivity data for the current year (in hours)"
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], OverviewMonthlyProductivityResponse.prototype, "thisYear", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: [110, 140, 130],
        description: "Monthly productivity data for the previous year (in hours)"
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], OverviewMonthlyProductivityResponse.prototype, "lastYear", void 0);
//# sourceMappingURL=overview-monthly-productivity.response.js.map