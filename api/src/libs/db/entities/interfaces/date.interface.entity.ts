export interface ICreatedAtEntity {
	/**
	 * Date when this entity was created
	 */
	createdAt: Date
}

export interface IUpdatedAtEntity {
	/**
	 * Date when this entity was updated
	 */
	updatedAt: Date
}

export interface IDeletedAtEntity {
	/**
	 * Date when this entity was deleted
	 */
	deletedAt?: Date | null
}

export interface IDatesAllEntity extends ICreatedAtEntity, IUpdatedAtEntity, IDeletedAtEntity {}
