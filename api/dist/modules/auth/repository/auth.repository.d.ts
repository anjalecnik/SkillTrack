import { Repository } from "typeorm";
import { IAuthUserLocalSignupDbRequest } from "../interfaces/db/auth-user-local-create-db.interface";
import { UserEntity } from "src/libs/db/entities/user.entity";
export declare class AuthRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    getUserByEmail(email: string): Promise<UserEntity | undefined>;
    getUserById(userId: number): Promise<UserEntity | undefined>;
    getOrCreateUserByEmail(email: string): Promise<UserEntity>;
    createUser(localSignup: IAuthUserLocalSignupDbRequest): Promise<UserEntity>;
}
