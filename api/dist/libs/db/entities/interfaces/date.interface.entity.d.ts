export interface ICreatedAtEntity {
    createdAt: Date;
}
export interface IUpdatedAtEntity {
    updatedAt: Date;
}
export interface IDeletedAtEntity {
    deletedAt?: Date | null;
}
export interface IDatesAllEntity extends ICreatedAtEntity, IUpdatedAtEntity, IDeletedAtEntity {
}
