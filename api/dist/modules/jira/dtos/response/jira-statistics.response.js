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
exports.JiraStatisticsResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class JiraStatisticsResponse {
    user;
    accountId;
    todo;
    inProgress;
    done;
    totalDoneHistory;
    totalAssigned;
}
exports.JiraStatisticsResponse = JiraStatisticsResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Janez novak" }),
    __metadata("design:type", String)
], JiraStatisticsResponse.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], JiraStatisticsResponse.prototype, "accountId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], JiraStatisticsResponse.prototype, "todo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], JiraStatisticsResponse.prototype, "inProgress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12 }),
    __metadata("design:type", Number)
], JiraStatisticsResponse.prototype, "done", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 24 }),
    __metadata("design:type", Number)
], JiraStatisticsResponse.prototype, "totalDoneHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7 }),
    __metadata("design:type", Number)
], JiraStatisticsResponse.prototype, "totalAssigned", void 0);
//# sourceMappingURL=jira-statistics.response.js.map