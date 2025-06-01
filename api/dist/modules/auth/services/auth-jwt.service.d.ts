import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../../../libs/db/entities/user.entity";
import { IAuthJwtPayload, IAuthJwtRefreshPayload } from "../interfaces";
export declare class AuthJwtService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    signAccessJwt(uuid: string, user: UserEntity): string;
    signRefreshJwt(uuid: string, user: UserEntity): string;
    decodeRefreshJwt<T extends IAuthJwtRefreshPayload>(token: string): T | null;
    decodeAuthJwt<T extends IAuthJwtPayload>(token: string): T | null;
}
