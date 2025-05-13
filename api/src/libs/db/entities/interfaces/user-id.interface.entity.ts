export interface ICreatedByUserIdEntity {
	/**
	 * Id of user that created this entity
	 */
	createdByUserId?: number | null
}

export interface IInvitedByUserIdEntity {
	/**
	 * Id of workspace user that created this entity
	 */
	invitedByUserId?: number | null
}

export interface IUpdatedByUserIdEntity {
	/**
	 * Id of user that updated this entity
	 */
	updatedByUserId?: number | null
}

export interface IReportedByUserIdEntity {
	/**
	 * Id of user that reported this entity
	 */
	reportedByUserId: number
}

export interface IReviewedByUserIdEntity {
	/**
	 * Id of user that reviewed this entity
	 */
	reviewedByUserId?: number | null
}

export interface IDeletedByUserIdEntity {
	/**
	 * Id of user that deleted this entity
	 */
	deletedByUserId?: number | null
}

export interface ICreatedUpdatedDeletedByUserIdEntity extends ICreatedByUserIdEntity, IUpdatedByUserIdEntity, IDeletedByUserIdEntity {}
