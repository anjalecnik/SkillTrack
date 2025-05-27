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
exports.ActivitySharedValidationService = void 0;
const common_1 = require("@nestjs/common");
const utility_service_1 = require("../../../../../../utility/services/utility.service");
const origin_hub_enum_1 = require("../../../../../../../utils/types/enums/origin-hub.enum");
const user_activity_status_enum_1 = require("../../../../../../../utils/types/enums/user-activity-status.enum");
const user_role_enum_1 = require("../../../../../../../utils/types/enums/user-role.enum");
let ActivitySharedValidationService = class ActivitySharedValidationService {
    utilityService;
    constructor(utilityService) {
        this.utilityService = utilityService;
    }
    async validateWorkspaceViolationAndGetIsPrivilege({ userId, reportedByUserId }, requestOriginHub) {
        const [user, reportedBy] = await Promise.all([this.utilityService.getUserById(userId), this.utilityService.getUserById(reportedByUserId)]);
        const isSupervisor = await this.utilityService.isUserSupervisorToEmployee(reportedBy.id, user.id);
        const isPrivileged = requestOriginHub === origin_hub_enum_1.originHub.workspaceHub || isSupervisor;
        if (user.id !== reportedBy.id) {
            if (!isPrivileged)
                throw new common_1.UnauthorizedException("User lacks permissions to report for others", `User ID: '${reportedBy.id}' does not have permission to report activities'`);
        }
        return isPrivileged;
    }
    async validateIsWorkingDays(days) {
        const workDay = await this.utilityService.getWorkingDays(days);
        workDay.map(workDay => {
            if (workDay.isHoliday)
                throw new common_1.BadRequestException("Can not report on holiday");
            if (workDay.isWorkFreeDay)
                throw new common_1.BadRequestException(`Can not report on this day because is not part of working days`);
        });
    }
    async validateReviewer(activity, reviewerRequest) {
        const reviewerUser = await this.utilityService.getUserById(reviewerRequest.reviewedByUserId);
        if (![user_activity_status_enum_1.UserActivityStatus.Approved, user_activity_status_enum_1.UserActivityStatus.Rejected].includes(reviewerRequest.status))
            throw new common_1.BadRequestException(`Reviewer can only change status to ${user_activity_status_enum_1.UserActivityStatus.Approved} or ${user_activity_status_enum_1.UserActivityStatus.Rejected}`, `Reviewer with ID '${reviewerRequest.reviewedByUserId}' can change status only to ${user_activity_status_enum_1.UserActivityStatus.Approved} or ${user_activity_status_enum_1.UserActivityStatus.Rejected}`);
        this.validateActivityStatusChange(activity, reviewerRequest);
        if ([user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.Owner].includes(reviewerUser.role))
            return;
        await this.utilityService.isUserSupervisorToEmployee(reviewerUser.id, activity.userId);
    }
    validateActivityStatusChange(currentActivity, newActivity) {
        switch (newActivity.status) {
            case user_activity_status_enum_1.UserActivityStatus.Canceled:
                if (![user_activity_status_enum_1.UserActivityStatus.PendingApproval, user_activity_status_enum_1.UserActivityStatus.Approved].includes(currentActivity.status))
                    throw new common_1.BadRequestException(`Activity already has final status ${currentActivity.status}`);
                return;
            case user_activity_status_enum_1.UserActivityStatus.Approved:
            case user_activity_status_enum_1.UserActivityStatus.Rejected:
                if (![user_activity_status_enum_1.UserActivityStatus.PendingApproval].includes(currentActivity.status))
                    throw new common_1.BadRequestException(`Activity is not Pending Approval. Current status: ${currentActivity.status}`);
                return;
            default:
                throw new common_1.BadRequestException(`Activity already has final status ${currentActivity.status}`);
        }
    }
};
exports.ActivitySharedValidationService = ActivitySharedValidationService;
exports.ActivitySharedValidationService = ActivitySharedValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [utility_service_1.UtilityService])
], ActivitySharedValidationService);
//# sourceMappingURL=activity-shared-validation.service.js.map