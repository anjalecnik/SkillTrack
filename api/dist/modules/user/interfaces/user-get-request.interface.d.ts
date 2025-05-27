import { UserEntity } from "src/libs/db/entities/user.entity";
import { IAuthJwtPassportUserRequest } from "src/modules/auth/interfaces";
export type IUserGetRequest = Pick<UserEntity, "id"> & {
    authPassport?: IAuthJwtPassportUserRequest;
};
