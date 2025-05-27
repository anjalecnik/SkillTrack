import { UserEntity } from "src/libs/db/entities/user.entity";
export interface IUserJoinDBRequest extends Required<Pick<UserEntity, "id" | "email" | "name" | "surname">> {
    additionalId?: number;
}
