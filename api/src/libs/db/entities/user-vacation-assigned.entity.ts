import { DB_VARCHAR_LENGTH_128, DB_VARCHAR_LENGTH_5 } from "../../../utils/constants"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { DateTransformerHelper } from "../helpers/date-transformer.helper"
import { IDatesAllEntity } from "./interfaces/date.interface.entity"
import { ICreatedUpdatedDeletedByUserIdEntity } from "./interfaces/user-id.interface.entity"
import { UserActivityEntity } from "./user-activity.entity"
import { UserEntity } from "./user.entity"

@Entity("user_vacation_assigned")
@Unique(["userId", "year"])
export class UserVacationAssignedEntity implements IDatesAllEntity, ICreatedUpdatedDeletedByUserIdEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({
		type: "integer"
	})
	year!: number

	@Column({
		type: "integer",
		comment: "Assigned vacation days for the year",
		nullable: true
	})
	assignedDays!: number | null

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_128,
		comment: "Description for assigned vacation",
		nullable: true
	})
	description?: string

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_5,
		comment: "Expiration date of old vacation in MM-DD format",
		nullable: true
	})
	oldVacationExpiration!: string | null

	@Column({
		type: "integer",
		comment: "Used vacation days for the year. If not null this property flags assigned vacation as initial",
		nullable: true
	})
	initialUsedDays!: number | null

	@Column({
		type: "date",
		transformer: DateTransformerHelper,
		nullable: true
	})
	initialDate!: Date | null

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date

	@Column({
		type: "integer",
		comment: "Quick reference to the user"
	})
	userId!: number

	@Column({
		type: "integer",
		comment: "Quick reference to the user who created assigned Vacation",
		nullable: true
	})
	createdByUserId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to the user who updated assigned Vacation",
		nullable: true
	})
	updatedByUserId?: number | null

	@OneToMany(() => UserActivityEntity, userActivity => userActivity.userVacationAssigned)
	vacations?: UserActivityEntity[]

	@ManyToOne(() => UserEntity, user => user.assignedVacations)
	@JoinColumn({ name: "userId" })
	user?: UserEntity

	@ManyToOne(() => UserEntity, user => user.createdAssignedVacations)
	@JoinColumn({ name: "createdByUserId" })
	createdByUser?: UserEntity

	@ManyToOne(() => UserEntity, user => user.updatedAssignedVacations)
	@JoinColumn({ name: "updatedByWorkspaceUserId" })
	updatedByUser?: UserEntity
}
