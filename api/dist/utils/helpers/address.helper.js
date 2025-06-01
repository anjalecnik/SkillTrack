"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressHelper = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = __importDefault(require("lodash"));
const user_address_enum_1 = require("../types/enums/user-address.enum");
class AddressHelper {
    static validateAddressRequest(existingAddresses, requestedAddresses) {
        this.validateRequestedAddresses(existingAddresses, requestedAddresses);
        this.validateMainAddress(requestedAddresses);
        this.validateNoDuplicateAddresses(requestedAddresses);
    }
    static validateRequestedAddresses(existingAddresses, requestedAddresses) {
        const existingAddressIds = existingAddresses.map(existingAddress => existingAddress.id);
        const requestedAddressIds = requestedAddresses.filter(requestedAddress => requestedAddress.id).map(requestedAddress => requestedAddress.id);
        const duplicates = requestedAddressIds.filter((id, index) => requestedAddressIds.indexOf(id) !== index);
        if (duplicates.length !== 0)
            throw new common_1.BadRequestException("Address duplication", `Address '${duplicates[0]}' specified multiple times`);
        requestedAddressIds.forEach(requestedAddressId => {
            if (!existingAddressIds.includes(requestedAddressId))
                throw new common_1.NotFoundException("Address not found", `Address '${requestedAddressId}' does not exists`);
        });
    }
    static validateMainAddress(requestedAddresses) {
        const mainAddresses = requestedAddresses.filter(requestedAddress => Object.values(user_address_enum_1.UserAddressType).includes(requestedAddress.type));
        if (mainAddresses.length !== 1) {
            throw new common_1.BadRequestException("One Main address must be specified");
        }
    }
    static validateNoDuplicateAddresses(requestedAddresses) {
        for (let i = 0; i < requestedAddresses.length; i++) {
            const iAddress = this.getAddressData(requestedAddresses[i]);
            for (let j = 0; j < requestedAddresses.length; j++) {
                if (i === j)
                    continue;
                const jAddress = this.getAddressData(requestedAddresses[j]);
                if (lodash_1.default.isEqual(iAddress, jAddress))
                    throw new common_1.BadRequestException(`You already have address with the same information. Duplicated addresses not allowed.`);
            }
        }
    }
    static getAddressData(address) {
        return {
            streetAddress: address.streetAddress,
            city: address.city,
            state: address.state ?? null,
            postalCode: address.postalCode ?? null,
            countryCode: address.countryCode
        };
    }
}
exports.AddressHelper = AddressHelper;
//# sourceMappingURL=address.helper.js.map