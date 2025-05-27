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
exports.DateTimeWithoutTimezoneResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class DateTimeWithoutTimezoneResponse {
    date;
    time;
}
exports.DateTimeWithoutTimezoneResponse = DateTimeWithoutTimezoneResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Date part of DateTime object", example: "2024-01-01" }),
    __metadata("design:type", String)
], DateTimeWithoutTimezoneResponse.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Time part of DateTime object", example: "07:58" }),
    __metadata("design:type", String)
], DateTimeWithoutTimezoneResponse.prototype, "time", void 0);
//# sourceMappingURL=date-time-without-timezone.response.js.map