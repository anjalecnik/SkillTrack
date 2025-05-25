import {
	DB_VARCHAR_LENGTH_1024,
	DB_VARCHAR_LENGTH_128,
	DB_VARCHAR_LENGTH_2048,
	DB_VARCHAR_LENGTH_256,
	DB_VARCHAR_LENGTH_32,
	POSTGRES_EXPENSE_VALUE_IN_EURO_PRECISION,
	POSTGRES_EXPENSE_VALUE_IN_EURO_SCALE
} from "../../../utils/constants"
import { UserActivityStatus } from "../../../utils/types/enums/user-activity-status.enum"
import { UserActivityType } from "../../../utils/types/enums/user-activity.enum"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { ICreatedAtEntity, IUpdatedAtEntity } from "./interfaces/date.interface.entity"
import { IReportedByUserIdEntity, IReviewedByUserIdEntity } from "./interfaces/user-id.interface.entity"
import { UserEntity } from "./user.entity"
import { ProjectEntity } from "./project.entity"
import { UserActivityEntity } from "./user-activity.entity"
import { NotificationEntity } from "./notification.entity"

@Entity("user_activity_request")
export class UserActivityRequestEntity implements ICreatedAtEntity, IUpdatedAtEntity, IReportedByUserIdEntity, IReviewedByUserIdEntity {
	@PrimaryGeneratedColumn()
	id!: number

	//#region  common
	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_32,
		default: UserActivityStatus.PendingApproval
	})
	status!: UserActivityStatus

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_32
	})
	activityType!: UserActivityType

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_1024,
		comment: "Description of activity",
		nullable: true
	})
	description?: string | null

	@Column({
		type: "integer",
		nullable: true,
		comment: "Hours worked. Used for Daily, BusinessTrip"
	})
	hours?: number | null
	//#endregion  common

	//#region  Date
	@Column({
		type: "timestamp",
		comment: "Start date of activity"
	})
	dateStart!: Date

	@Column({
		type: "timestamp",
		comment: "End date of activity",
		nullable: true
	})
	dateEnd?: Date | null
	//#endregion  Date

	//#region business trip
	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_256,
		comment: "Location of activity",
		nullable: true
	})
	location?: string | null

	@Column({
		type: "integer",
		comment: "Distance of businessT trip",
		nullable: true
	})
	distanceInKM?: number | null
	//#endregion business trip

	//#region expense
	@Column({
		type: "decimal",
		precision: POSTGRES_EXPENSE_VALUE_IN_EURO_PRECISION,
		scale: POSTGRES_EXPENSE_VALUE_IN_EURO_SCALE,
		comment: "Value of expense in Eur",
		nullable: true
	})
	valueInEuro?: number | null

	@Column({
		type: "boolean",
		comment: "Is paid with company card flag",
		nullable: true
	})
	isPaidWithCompanyCard?: boolean | null

	//#endregion expense

	//#region relations

	@Column({
		type: "integer",
		comment: "Quick reference to user"
	})
	userId!: number

	@Column({
		type: "integer",
		comment: "Quick reference to reporter"
	})
	reportedByUserId!: number

	@Column({
		type: "integer",
		comment: "Quick reference to reviewer",
		nullable: true
	})
	reviewedByUserId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to project",
		nullable: true
	})
	projectId?: number | null

	@ManyToOne(() => UserEntity, user => user.activityRequests)
	@JoinColumn({ name: "userId" })
	user?: UserEntity

	@ManyToOne(() => UserEntity, user => user.reportedActivityRequests)
	@JoinColumn({ name: "reportedByUserId" })
	reportedByUser?: UserEntity

	@ManyToOne(() => UserEntity, user => user.reviewedActivityRequests)
	@JoinColumn({ name: "reviewedByUserId" })
	reviewedByUser?: UserEntity

	@ManyToOne(() => ProjectEntity, project => project.activityRequests)
	@JoinColumn({ name: "projectId" })
	project?: ProjectEntity

	@OneToMany(() => UserActivityEntity, userActivity => userActivity.activityRequest, { cascade: true })
	userActivities?: UserActivityEntity[]

	@OneToMany(() => NotificationEntity, notification => notification.userActivityRequest)
	notifications?: NotificationEntity[]
	//#endregion relations

	@UpdateDateColumn()
	updatedAt!: Date

	@CreateDateColumn()
	createdAt!: Date
}
