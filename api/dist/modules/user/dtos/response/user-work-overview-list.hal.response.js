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
exports.UserWorkOverviewListHalResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_work_overview_total_statistics_response_1 = require("./user-work-overview-total-statistics.response");
const work_overview_user_statistics_response_1 = require("./work-overview-user-statistics.response");
class UserWorkOverviewListHalResponse {
    _links;
    users;
    total;
}
exports.UserWorkOverviewListHalResponse = UserWorkOverviewListHalResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            self: { href: "api/users/4/work-overviews?projectIds=6&projectIds=7" }
        },
        description: "Links for the resource"
    }),
    __metadata("design:type", Object)
], UserWorkOverviewListHalResponse.prototype, "_links", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: work_overview_user_statistics_response_1.UserStatistics, isArray: true, description: "User statistics by project, and total statistics by user" }),
    __metadata("design:type", Array)
], UserWorkOverviewListHalResponse.prototype, "users", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_work_overview_total_statistics_response_1.TotalStatistics, description: "Total statistics across all users" }),
    __metadata("design:type", user_work_overview_total_statistics_response_1.TotalStatistics)
], UserWorkOverviewListHalResponse.prototype, "total", void 0);
//# sourceMappingURL=user-work-overview-list.hal.response.js.map