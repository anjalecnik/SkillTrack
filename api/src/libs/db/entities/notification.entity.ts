import { DB_VARCHAR_LENGTH_256, DB_VARCHAR_LENGTH_32, DB_VARCHAR_LENGTH_1024 } from "../../../utils/constants"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { ICreatedAtEntity, IUpdatedAtEntity } from "./interfaces/date.interface.entity"
import { UserEntity } from "./user.entity"
import { NotificationStatus } from "../../../utils/types/enums/notification-status.enum"
import { NotificationType } from "../../../utils/types/enums/notficiation.enum"
import { UserActivityRequestEntity } from "./user-activity-request.entity"

@Entity("notification")
export class NotificationEntity implements ICreatedAtEntity, IUpdatedAtEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_256,
		nullable: true,
		comment: "Cronjob expression. If empty, process immediately"
	})
	sendSchedule!: string | null

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_256,
		nullable: true,
		comment: "Used only for cron jobs"
	})
	scheduledJobName!: string | null

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_32,
		default: NotificationStatus.Pending
	})
	status!: NotificationStatus

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_32
	})
	type!: NotificationType

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_1024,
		nullable: true
	})
	errorMessage?: string | null

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date

	// References
	@Column({
		type: "integer",
		comment: "Quick reference to the user",
		nullable: true
	})
	userId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to the user activity request",
		nullable: true
	})
	userActivityRequestId?: number | null

	// Relations
	@ManyToOne(() => UserEntity, user => user.notifications, { onDelete: "CASCADE" })
	@JoinColumn({ name: "userId" })
	user?: UserEntity

	@ManyToOne(() => UserActivityRequestEntity, userActivityRequest => userActivityRequest.notifications, { onDelete: "CASCADE" })
	@JoinColumn({ name: "userActivityRequestId" })
	userActivityRequest?: UserActivityRequestEntity
}
