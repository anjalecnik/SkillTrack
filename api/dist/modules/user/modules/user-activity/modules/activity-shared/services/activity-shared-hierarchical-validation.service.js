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
exports.ActivitySharedHierarchicalValidationService = void 0;
const common_1 = require("@nestjs/common");
const utility_service_1 = require("../../../../../../utility/services/utility.service");
const origin_hub_enum_1 = require("../../../../../../../utils/types/enums/origin-hub.enum");
let ActivitySharedHierarchicalValidationService = class ActivitySharedHierarchicalValidationService {
    utilityService;
    constructor(utilityService) {
        this.utilityService = utilityService;
    }
    async validateHierarchicalViolationAndGetIsPrivilege({ userId, reportedByUserId }, requestOriginHub) {
        const [user, reportedBy] = await Promise.all([this.utilityService.getUserById(userId), this.utilityService.getUserById(reportedByUserId)]);
        const subordinateIds = await this.utilityService.getSubordinateIdsRecursively(reportedBy.id, new Set());
        const isPrivileged = requestOriginHub === origin_hub_enum_1.originHub.workspaceHub;
        if (user.id === reportedBy.id && !subordinateIds.includes(user.id))
            if (!isPrivileged)
                throw new common_1.BadRequestException("Unauthorized self-reporting", `User ID: '${reportedBy.id}' cannot report their own activities unless they are an admin or higher.'`);
        if (!subordinateIds.includes(user.id)) {
            if (!isPrivileged)
                throw new common_1.UnauthorizedException("User lacks permissions to report for others", `User ID: '${reportedBy.id}' is not authorized to report activities for user ID: '${user.id}'`);
        }
        return isPrivileged;
    }
};
exports.ActivitySharedHierarchicalValidationService = ActivitySharedHierarchicalValidationService;
exports.ActivitySharedHierarchicalValidationService = ActivitySharedHierarchicalValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [utility_service_1.UtilityService])
], ActivitySharedHierarchicalValidationService);
//# sourceMappingURL=activity-shared-hierarchical-validation.service.js.map