import { UserAddressRepository } from "../repository/user-address.repository";
import { UserAddressPatchRequest } from "../dtos/request/user-address-patch.request";
export declare class UserAddressService {
    private readonly userAddressRepository;
    constructor(userAddressRepository: UserAddressRepository);
    validateAddressRequest(userId: number, addresses: UserAddressPatchRequest[]): Promise<void>;
}
