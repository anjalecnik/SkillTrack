import { IDatesAllEntity } from "./interfaces/date.interface.entity";
import { ICreatedUpdatedDeletedByUserIdEntity } from "./interfaces/user-id.interface.entity";
import { UserAddressType } from "../../../utils/types/enums/user-address.enum";
import { UserEntity } from "./user.entity";
export declare class UserAddressEntity implements ICreatedUpdatedDeletedByUserIdEntity, IDatesAllEntity {
    id: number;
    streetAddress: string;
    city: string;
    state?: string | null;
    postalCode?: string | null;
    countryCode: string;
    type: UserAddressType;
    userId: number;
    createdByUserId: number;
    updatedByUserId: number;
    deletedByUserId?: number | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    user?: UserEntity;
    createdByUser?: UserEntity;
    updatedByUser?: UserEntity;
    deletedByUser?: UserEntity;
}
