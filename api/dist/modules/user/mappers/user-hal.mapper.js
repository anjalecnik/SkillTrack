"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHalMapper = void 0;
const config_1 = require("../../../utils/config/config");
const constants_1 = require("../../../utils/constants");
const hal_helper_1 = require("../../../utils/helpers/hal.helper");
class UserHalMapper {
    static composeUserPath(user) {
        return `${config_1.Config.get("APP_API_PREFIX")}/${constants_1.ROUTE_USER}/${user.id}`;
    }
    static composeUserWorkPositionPath(user) {
        return `${config_1.Config.get("APP_API_PREFIX")}/${constants_1.ROUTE_USER}/${user.id}/${constants_1.ROUTE_WORK_POSITION}/${user.workPositionId}`;
    }
    static mapHalUserShort(user) {
        const url = this.composeUserPath(user);
        const _embedded = this.mapUserEmbedded(user);
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            _links: {
                self: hal_helper_1.HalHelper.halSelf(url)
            },
            _embedded
        };
    }
    static mapUserEmbedded(user) {
        const hasEmbedded = !!user.workPosition;
        if (!hasEmbedded)
            return undefined;
        const workPosition = user.workPosition ? this.mapHalUserEmbeddedWorkPositionHal(user) : undefined;
        return {
            workPosition
        };
    }
    static mapHalUserEmbeddedWorkPositionHal(user) {
        const url = this.composeUserWorkPositionPath(user);
        const { id, name } = user.workPosition;
        return {
            id,
            name,
            _links: {
                self: hal_helper_1.HalHelper.halSelf(url)
            }
        };
    }
}
exports.UserHalMapper = UserHalMapper;
//# sourceMappingURL=user-hal.mapper.js.map