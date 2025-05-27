import { UserEntity } from "./user.entity";
export declare class TeamEntity {
    id: number;
    name: string;
    description: string;
    createdBy: string | null;
    modifiedBy: string | null;
    createDate: Date;
    updateDate: Date;
    deleteDate: Date;
    user?: UserEntity[];
}
