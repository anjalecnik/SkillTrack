import { UserEntity } from "src/libs/db/entities/user.entity";
export type IUserDeleteDBRequest = Pick<UserEntity, "id" | "deletedByUserId">;
