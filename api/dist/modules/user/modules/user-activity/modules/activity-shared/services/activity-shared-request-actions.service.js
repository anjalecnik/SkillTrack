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
exports.ActivitySharedRequestActionsService = void 0;
const common_1 = require("@nestjs/common");
const utility_service_1 = require("../../../../../../utility/services/utility.service");
const user_activity_request_actions_enum_1 = require("../../../../../../../utils/types/enums/user-activity-request-actions.enum");
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
const user_role_enum_1 = require("../../../../../../../utils/types/enums/user-role.enum");
const UserType = {
    [user_activity_status_enum_1.UserActivityStatus.PendingApproval]: [user_activity_request_actions_enum_1.UserActivityRequestActions.Cancel],
    [user_activity_status_enum_1.UserActivityStatus.Approved]: [user_activity_request_actions_enum_1.UserActivityRequestActions.Cancel],
    [user_activity_status_enum_1.UserActivityStatus.Canceled]: [],
    [user_activity_status_enum_1.UserActivityStatus.Rejected]: []
};
const SubordinateType = {
    [user_activity_status_enum_1.UserActivityStatus.PendingApproval]: [user_activity_request_actions_enum_1.UserActivityRequestActions.Approve, user_activity_request_actions_enum_1.UserActivityRequestActions.Reject],
    [user_activity_status_enum_1.UserActivityStatus.Approved]: [],
    [user_activity_status_enum_1.UserActivityStatus.Canceled]: [],
    [user_activity_status_enum_1.UserActivityStatus.Rejected]: []
};
const AdminType = {
    [user_activity_status_enum_1.UserActivityStatus.PendingApproval]: [user_activity_request_actions_enum_1.UserActivityRequestActions.Approve, user_activity_request_actions_enum_1.UserActivityRequestActions.Reject, user_activity_request_actions_enum_1.UserActivityRequestActions.Cancel],
    [user_activity_status_enum_1.UserActivityStatus.Approved]: [user_activity_request_actions_enum_1.UserActivityRequestActions.Cancel],
    [user_activity_status_enum_1.UserActivityStatus.Canceled]: [],
    [user_activity_status_enum_1.UserActivityStatus.Rejected]: []
};
let ActivitySharedRequestActionsService = class ActivitySharedRequestActionsService {
    utilityService;
    constructor(utilityService) {
        this.utilityService = utilityService;
    }
    getUserTypeSelf(UserEntity) {
        if (UserEntity.managerId === null || UserEntity.managerId === UserEntity.id)
            return "SelfSuperior";
        return "RegularUser";
    }
    async getUserTypeForRequest(userInvokerEntity, currentType, activityRequest, subordinateIds) {
        if (userInvokerEntity.id === activityRequest.userId)
            return currentType;
        if (subordinateIds.includes(activityRequest.userId)) {
            return "Reviewer";
        }
        return "None";
    }
    async getUserType(userInvoker, activityRequest, subordinateIds) {
        const userInvokerEntity = typeof userInvoker === "number" ? await this.utilityService.getUserById(userInvoker) : userInvoker;
        if ([user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.Owner].includes(userInvokerEntity.role))
            return "Admin";
        const invokerUserTypeSelf = this.getUserTypeSelf(userInvokerEntity);
        const invokerUserType = await this.getUserTypeForRequest(userInvokerEntity, invokerUserTypeSelf, activityRequest, subordinateIds);
        return invokerUserType;
    }
    async getActivityRequestActions(userInvoker, activityRequest, subordinateIds) {
        const currentActivityStatus = activityRequest.status;
        const invokerUserType = await this.getUserType(userInvoker, activityRequest, subordinateIds);
        switch (invokerUserType) {
            case "Admin":
                return AdminType[currentActivityStatus];
            case "SelfSuperior":
                return [...UserType[currentActivityStatus], ...SubordinateType[currentActivityStatus]];
            case "RegularUser":
                return [...UserType[currentActivityStatus]];
            case "Reviewer":
                return SubordinateType[currentActivityStatus];
            default:
                return [];
        }
    }
};
exports.ActivitySharedRequestActionsService = ActivitySharedRequestActionsService;
exports.ActivitySharedRequestActionsService = ActivitySharedRequestActionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [utility_service_1.UtilityService])
], ActivitySharedRequestActionsService);
//# sourceMappingURL=activity-shared-request-actions.service.js.map