import { UserEntity } from "src/libs/db/entities/user.entity";
import { UserShortHalResponse } from "src/utils/types/dtos";
export declare abstract class UserHalMapper {
    private static composeUserPath;
    private static composeUserWorkPositionPath;
    static mapHalUserShort(user: UserEntity): UserShortHalResponse;
    private static mapUserEmbedded;
    private static mapHalUserEmbeddedWorkPositionHal;
}
