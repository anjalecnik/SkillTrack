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
exports.UserListItemResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const team_details_response_1 = require("../../../team/dtos/team-details.response");
const work_position_list_item_response_1 = require("../../../work-position/dtos/response/work-position-list-item.response");
const user_role_enum_1 = require("../../../../utils/types/enums/user-role.enum");
const user_status_enum_1 = require("../../../../utils/types/enums/user-status.enum");
const user_vacation_statistic_response_1 = require("./activity/user-vacation-statistic.response");
class UserListItemResponse {
    id;
    email;
    status;
    role;
    name;
    surname;
    vacation;
    team;
    workPosition;
}
exports.UserListItemResponse = UserListItemResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserListItemResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "bob.the.builder@gmail.com" }),
    __metadata("design:type", String)
], UserListItemResponse.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: user_status_enum_1.UserStatus.Active, enum: user_status_enum_1.UserStatus }),
    __metadata("design:type", String)
], UserListItemResponse.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: user_role_enum_1.UserRole.User, enum: user_role_enum_1.UserRole }),
    __metadata("design:type", String)
], UserListItemResponse.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Bob" }),
    __metadata("design:type", String)
], UserListItemResponse.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Builder" }),
    __metadata("design:type", String)
], UserListItemResponse.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: user_vacation_statistic_response_1.UserVacationStatisticResponse }),
    __metadata("design:type", user_vacation_statistic_response_1.UserVacationStatisticResponse)
], UserListItemResponse.prototype, "vacation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: team_details_response_1.TeamDetailsResponse }),
    __metadata("design:type", team_details_response_1.TeamDetailsResponse)
], UserListItemResponse.prototype, "team", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: work_position_list_item_response_1.WorkPositionListItemResponse }),
    __metadata("design:type", work_position_list_item_response_1.WorkPositionListItemResponse)
], UserListItemResponse.prototype, "workPosition", void 0);
//# sourceMappingURL=user-list-item.response.js.map