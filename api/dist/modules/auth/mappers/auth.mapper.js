"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMapper = void 0;
class AuthMapper {
    static mapSignAuthJwtAccessToken(uuid, user) {
        return {
            uuid: uuid,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                status: user.status
            }
        };
    }
    static mapSignAuthJwtRefreshToken(uuid, user) {
        return {
            uuid: uuid,
            userId: user.id
        };
    }
    static mapAuthPassportUserRequestFromPayload(payload) {
        return {
            user: {
                email: payload.user.email,
                id: payload.user.id,
                status: payload.user.status,
                role: payload.user.role
            }
        };
    }
    static mapUserAccount(user) {
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            status: user.status
        };
    }
}
exports.AuthMapper = AuthMapper;
//# sourceMappingURL=auth.mapper.js.map