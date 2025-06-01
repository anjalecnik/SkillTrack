"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddressMapper = void 0;
class UserAddressMapper {
    static mapUserAddressDetails(address) {
        return {
            id: address.id,
            streetAddress: address.streetAddress,
            city: address.city,
            state: address.state ?? undefined,
            postalCode: address.postalCode ?? undefined,
            countryCode: address.countryCode,
            type: address.type
        };
    }
}
exports.UserAddressMapper = UserAddressMapper;
//# sourceMappingURL=user-address.mapper.js.map