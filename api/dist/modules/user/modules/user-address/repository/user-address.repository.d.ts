import { UserAddressEntity } from "src/libs/db/entities/user-address.entity";
import { Repository } from "typeorm";
export declare class UserAddressRepository {
    private readonly userAddressRepository;
    constructor(userAddressRepository: Repository<UserAddressEntity>);
    getUserAddressAll(userId: number): Promise<UserAddressEntity[]>;
    checkIfUserAddressExistOrThrow(userId: number, addressId: number): Promise<void>;
}
