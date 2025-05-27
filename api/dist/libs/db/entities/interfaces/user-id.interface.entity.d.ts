export interface ICreatedByUserIdEntity {
    createdByUserId?: number | null;
}
export interface IInvitedByUserIdEntity {
    invitedByUserId?: number | null;
}
export interface IUpdatedByUserIdEntity {
    updatedByUserId?: number | null;
}
export interface IReportedByUserIdEntity {
    reportedByUserId: number;
}
export interface IReviewedByUserIdEntity {
    reviewedByUserId?: number | null;
}
export interface IDeletedByUserIdEntity {
    deletedByUserId?: number | null;
}
export interface ICreatedUpdatedDeletedByUserIdEntity extends ICreatedByUserIdEntity, IUpdatedByUserIdEntity, IDeletedByUserIdEntity {
}
