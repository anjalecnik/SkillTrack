"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthJwtPassportUserDetails = void 0;
const common_1 = require("@nestjs/common");
exports.AuthJwtPassportUserDetails = (0, common_1.createParamDecorator)((_data, context) => {
    const { user: passport } = context.switchToHttp().getRequest();
    if (!passport) {
        throw new common_1.UnauthorizedException("No user found");
    }
    return passport;
});
//# sourceMappingURL=auth-jwt-passport-user.decorator.js.map