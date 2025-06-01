import { UserAddressType } from "src/utils/types/enums/user-address.enum";
export declare class UserAddressDetailsResponse {
    id: number;
    streetAddress: string;
    city: string;
    state?: string;
    postalCode?: string;
    countryCode: string;
    type: UserAddressType;
}
