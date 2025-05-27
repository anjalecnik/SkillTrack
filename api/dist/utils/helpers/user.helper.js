"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHelper = void 0;
const common_1 = require("@nestjs/common");
const user_status_enum_1 = require("../types/enums/user-status.enum");
const type_helper_1 = require("./type.helper");
class UserHelper {
    static getFullUserName(user) {
        return user.name + " " + user.surname;
    }
    static getFullUserNameUpperCase(user) {
        const fullName = this.getFullUserName(user);
        return fullName
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
    static getNamePropertiesFromFullName(fullName) {
        const nameSplit = fullName.split(" ");
        const name = nameSplit[0];
        const surname = nameSplit.length > 1 ? nameSplit[nameSplit.length - 1] : "";
        return {
            name,
            surname
        };
    }
    static validateActive(user) {
        if (user.status !== user_status_enum_1.UserStatus.Active) {
            throw new common_1.BadRequestException(`User does not have 'Active' status`, `User status is: ${user.status}`);
        }
    }
    static validateActivityRequestsRelation(user) {
        return type_helper_1.TypeHelper.validateRelation(user, "activityRequests");
    }
}
exports.UserHelper = UserHelper;
//# sourceMappingURL=user.helper.js.map