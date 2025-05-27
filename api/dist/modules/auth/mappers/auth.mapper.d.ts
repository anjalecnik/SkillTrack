import { UserEntity } from "../../../libs/db/entities/user.entity";
import { IAuthJwtPassportUserDataRequest, IAuthJwtPassportUserRequest, IAuthJwtPayload, IAuthJwtRefreshPayload, IAuthSignJwtUserPayload } from "../interfaces";
export declare abstract class AuthMapper {
    static mapSignAuthJwtAccessToken(uuid: string, user: UserEntity): IAuthJwtPayload;
    static mapSignAuthJwtRefreshToken(uuid: string, user: UserEntity): IAuthJwtRefreshPayload;
    static mapAuthPassportUserRequestFromPayload(payload: IAuthJwtPayload): IAuthJwtPassportUserRequest;
    static mapUserAccount(user: IAuthSignJwtUserPayload): IAuthJwtPassportUserDataRequest;
}
