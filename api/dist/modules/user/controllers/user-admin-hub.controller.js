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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdminHubController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../utils/constants");
const guards_1 = require("../../../utils/guards");
const user_role_enum_1 = require("../../../utils/types/enums/user-role.enum");
const user_service_1 = require("../services/user.service");
const user_details_response_1 = require("../dtos/response/user-details.response");
const decorators_1 = require("../../../utils/decorators");
const user_mapper_1 = require("../mappers/user.mapper");
const user_list_response_1 = require("../dtos/response/user-list.response");
const user_pagination_filter_request_1 = require("../dtos/request/user-pagination-filter.request");
const user_invitation_list_response_1 = require("../dtos/response/user-invitation-list.response");
const user_invitation_list_request_1 = require("../dtos/request/user-invitation-list.request");
const user_patch_request_1 = require("../dtos/request/patch/user-patch.request");
let UserAdminHubController = class UserAdminHubController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getUser(authPassport, userId) {
        const userDetails = await this.userService.getUser({ id: userId, authPassport });
        return user_mapper_1.UserMapper.mapUserDetails(userDetails);
    }
    async geteUserList(filter) {
        const entities = await this.userService.getUserList({ ...filter });
        return user_mapper_1.UserMapper.mapUserPaginationList(entities.data, entities.meta);
    }
    async invite(authPassport, userInvitations) {
        const userEntities = await this.userService.invite({
            invitedByUserId: authPassport.user.id,
            invitations: userInvitations.invitations
        });
        return user_mapper_1.UserMapper.mapUserInvitations(userEntities);
    }
    async updateUser(authPassport, userId, userPatchRequest) {
        const userDetails = await this.userService.updateUser({
            id: userId,
            updatedByUserId: authPassport.user.id,
            ...userPatchRequest
        });
        return user_mapper_1.UserMapper.mapUserDetails(userDetails);
    }
};
exports.UserAdminHubController = UserAdminHubController;
__decorate([
    (0, common_1.Get)("/:userId"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Return user", description: `This endpoint requires the "Owner" or "Admin" role. Users with "User" role can only call themselves` }),
    (0, swagger_1.ApiOkResponse)({ description: "User", type: user_details_response_1.UserDetailsResponse }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserAdminHubController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Returns list of users", description: `This endpoint requires the "Owner" or "Admin" role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "Users", type: user_list_response_1.UserListResponse }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_pagination_filter_request_1.UserPaginationFilterRequest]),
    __metadata("design:returntype", Promise)
], UserAdminHubController.prototype, "geteUserList", null);
__decorate([
    (0, common_1.Post)("invite"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Invite user", description: `This endpoint requires the "Owner" or "Admin" role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "Invited", type: user_invitation_list_response_1.UserInvitationListResponse }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "User not found" }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_invitation_list_request_1.UserInvitationListRequest]),
    __metadata("design:returntype", Promise)
], UserAdminHubController.prototype, "invite", null);
__decorate([
    (0, common_1.Patch)("/:userId(\\d+)"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Update user", description: `This endpoint requires the "Owner", "Admin" or "User" role.` }),
    (0, swagger_1.ApiOkResponse)({ description: "Updated user", type: user_details_response_1.UserDetailsResponse }),
    __param(0, (0, decorators_1.AuthJwtPassportUserDetails)()),
    __param(1, (0, common_1.Param)("userId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, user_patch_request_1.UserPatchRequest]),
    __metadata("design:returntype", Promise)
], UserAdminHubController.prototype, "updateUser", null);
exports.UserAdminHubController = UserAdminHubController = __decorate([
    (0, common_1.Controller)(`/${constants_1.ROUTE_ADMIN_HUB}/${constants_1.ROUTE_USERS}`),
    (0, swagger_1.ApiTags)(`${constants_1.API_TAG_WORKSPACE} ${constants_1.API_TAG_USER}`),
    (0, common_1.UseGuards)((0, guards_1.UserGuard)(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.Owner)),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserAdminHubController);
//# sourceMappingURL=user-admin-hub.controller.js.map