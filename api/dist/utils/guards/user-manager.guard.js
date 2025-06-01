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
exports.UserManagerGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const utility_service_1 = require("../../modules/utility/services/utility.service");
let UserManagerGuard = class UserManagerGuard extends (0, passport_1.AuthGuard)("jwtUser") {
    utilityService;
    constructor(utilityService) {
        super();
        this.utilityService = utilityService;
    }
    async canActivate(context) {
        await super.canActivate(context);
        const request = context.switchToHttp().getRequest();
        const paramUserId = parseInt(request.params.userId);
        let userIds = [];
        if (!isNaN(paramUserId)) {
            userIds = [paramUserId];
        }
        else {
            userIds = request.query?.userIds?.map(Number) || request.body?.userIds?.map(Number);
            if (!userIds) {
                return false;
            }
        }
        const invokerId = request.user.id;
        const subordinateIds = await this.utilityService.getSubordinateIdsRecursively(invokerId, new Set());
        const allAreSubordinates = userIds.every(id => subordinateIds.includes(id));
        if (allAreSubordinates) {
            return true;
        }
        const isSelfSuperior = await this.utilityService.isUserSelfSuperior(invokerId);
        return isSelfSuperior && userIds.includes(invokerId);
    }
};
exports.UserManagerGuard = UserManagerGuard;
exports.UserManagerGuard = UserManagerGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [utility_service_1.UtilityService])
], UserManagerGuard);
//# sourceMappingURL=user-manager.guard.js.map