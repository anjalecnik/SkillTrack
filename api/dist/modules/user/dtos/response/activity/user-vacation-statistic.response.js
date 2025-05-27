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
exports.UserVacationStatisticResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_vacation_statistic_data_response_1 = require("./user-vacation-statistic-data.response");
class UserVacationStatisticResponse {
    new;
    old;
    total;
    upcoming;
}
exports.UserVacationStatisticResponse = UserVacationStatisticResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Current vacation statistic", type: user_vacation_statistic_data_response_1.UserVacationStatisticDataResponse }),
    __metadata("design:type", user_vacation_statistic_data_response_1.UserVacationStatisticDataResponse)
], UserVacationStatisticResponse.prototype, "new", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Previous vacation statistic", type: user_vacation_statistic_data_response_1.UserVacationStatisticDataResponse }),
    __metadata("design:type", user_vacation_statistic_data_response_1.UserVacationStatisticDataResponse)
], UserVacationStatisticResponse.prototype, "old", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total vacation statistic", type: user_vacation_statistic_data_response_1.UserVacationStatisticDataResponse }),
    __metadata("design:type", user_vacation_statistic_data_response_1.UserVacationStatisticDataResponse)
], UserVacationStatisticResponse.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Upcoming vacation statistic" }),
    __metadata("design:type", Number)
], UserVacationStatisticResponse.prototype, "upcoming", void 0);
//# sourceMappingURL=user-vacation-statistic.response.js.map