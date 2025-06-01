import { UserAddressType } from "src/utils/types/enums/user-address.enum";
export declare class UserAddressPatchRequest {
    id?: number;
    streetAddress: string;
    city: string;
    state?: string;
    postalCode?: string;
    countryCode: string;
    type: UserAddressType;
}
