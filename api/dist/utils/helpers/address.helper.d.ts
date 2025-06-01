import { UserAddressEntity } from "src/libs/db/entities/user-address.entity";
import { UserAddressPatchRequest } from "src/modules/user/modules/user-address/dtos/request/user-address-patch.request";
export declare class AddressHelper {
    static validateAddressRequest<T extends UserAddressEntity, U extends UserAddressPatchRequest>(existingAddresses: T[], requestedAddresses: U[]): void;
    private static validateRequestedAddresses;
    private static validateMainAddress;
    private static validateNoDuplicateAddresses;
    private static getAddressData;
}
