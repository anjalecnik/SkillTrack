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
exports.UserDetailsResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_base_response_1 = require("./user-base.response");
const user_activity_statistic_response_1 = require("./activity/user-activity-statistic.response");
const user_manager_short_response_1 = require("./user-manager-short.response");
const user_projects_short_response_1 = require("./user-projects-short.response");
const team_details_response_1 = require("../../../team/dtos/team-details.response");
const work_position_list_item_response_1 = require("../../../work-position/dtos/response/work-position-list-item.response");
const user_address_details_response_1 = require("../../modules/user-address/dtos/response/user-address-details.response");
const user_assigned_vacation_details_response_1 = require("../../modules/user-assigned-vacation/dtos/response/user-assigned-vacation-details.response");
class UserDetailsResponse extends user_base_response_1.UserBaseResponse {
    team;
    workPosition;
    manager;
    projects;
    addresses;
    assignedVacations;
    activityStatistic;
    isSupervisor;
}
exports.UserDetailsResponse = UserDetailsResponse;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: team_details_response_1.TeamDetailsResponse }),
    __metadata("design:type", team_details_response_1.TeamDetailsResponse)
], UserDetailsResponse.prototype, "team", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: work_position_list_item_response_1.WorkPositionListItemResponse }),
    __metadata("design:type", work_position_list_item_response_1.WorkPositionListItemResponse)
], UserDetailsResponse.prototype, "workPosition", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: user_manager_short_response_1.UserManagerShortResponse }),
    __metadata("design:type", user_manager_short_response_1.UserManagerShortResponse)
], UserDetailsResponse.prototype, "manager", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: user_projects_short_response_1.UserProjectsShortResponse, isArray: true }),
    __metadata("design:type", Array)
], UserDetailsResponse.prototype, "projects", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: user_address_details_response_1.UserAddressDetailsResponse, isArray: true }),
    __metadata("design:type", Array)
], UserDetailsResponse.prototype, "addresses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: user_assigned_vacation_details_response_1.UserAssignedVacationDetailsResponse, isArray: true }),
    __metadata("design:type", Array)
], UserDetailsResponse.prototype, "assignedVacations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_activity_statistic_response_1.UserActivityStatisticResponse }),
    __metadata("design:type", user_activity_statistic_response_1.UserActivityStatisticResponse)
], UserDetailsResponse.prototype, "activityStatistic", void 0);
//# sourceMappingURL=user-details.response.js.map