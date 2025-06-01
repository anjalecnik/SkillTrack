import { WithRequired } from "../types/interfaces";
import { UserEntity } from "src/libs/db/entities/user.entity";
export declare abstract class UserHelper {
    static getFullUserName(user: Pick<UserEntity, "name" | "surname">): string;
    static getFullUserNameUpperCase(user: Pick<UserEntity, "name" | "surname">): string;
    static getNamePropertiesFromFullName(fullName: string): Pick<UserEntity, "name" | "surname">;
    static validateActive(user: UserEntity): void;
    static validateActivityRequestsRelation(user: UserEntity): WithRequired<UserEntity, "activityRequests">;
}
