import { UserAddressEntity } from "src/libs/db/entities/user-address.entity";
import { UserAddressDetailsResponse } from "../dtos/response/user-address-details.response";
export declare abstract class UserAddressMapper {
    static mapUserAddressDetails(address: UserAddressEntity): UserAddressDetailsResponse;
}
