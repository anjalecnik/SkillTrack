"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
function UserGuard(...roles) {
    const JwtAuthGuard = (0, passport_1.AuthGuard)("jwtUser");
    let UserGuardMixin = class UserGuardMixin extends JwtAuthGuard {
        handleRequest(err, reqUser) {
            if (err || !reqUser || !reqUser.user) {
                throw err || new common_1.UnauthorizedException();
            }
            if (roles.length > 0 && !roles.includes(reqUser.user.role)) {
                throw new common_1.ForbiddenException("You do not have the required role for this action", `User does not have required role: ${reqUser.user.role}`);
            }
            return reqUser;
        }
    };
    UserGuardMixin = __decorate([
        (0, common_1.Injectable)()
    ], UserGuardMixin);
    return (0, common_1.mixin)(UserGuardMixin);
}
exports.UserGuard = UserGuard;
//# sourceMappingURL=user.guard.js.map