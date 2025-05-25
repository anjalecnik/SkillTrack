import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { ICreatedAtEntity, IUpdatedAtEntity } from "./interfaces/date.interface.entity"
import { IReportedByUserIdEntity, IReviewedByUserIdEntity } from "./interfaces/user-id.interface.entity"
import { DB_VARCHAR_LENGTH_32 } from "../../../utils/constants"
import { UserActivityType } from "../../../utils/types/enums/user-activity.enum"
import { UserActivityStatus } from "../../../utils/types/enums/user-activity-status.enum"
import { UserActivityWorkLocation } from "../../../utils/types/enums/user-activity-work-location.enum"
import { UserEntity } from "./user.entity"
import { ProjectEntity } from "./project.entity"
import { UserActivityRequestEntity } from "./user-activity-request.entity"
import { UserWorkingHoursEntity } from "./user-working-hours.entity"
import { UserVacationAssignedEntity } from "./user-vacation-assigned.entity"
import { UserPerformanceReviewEntity } from "./user-performance-review.entity"

@Entity("user_activity")
export class UserActivityEntity implements ICreatedAtEntity, IUpdatedAtEntity, IReportedByUserIdEntity, IReviewedByUserIdEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_32
	})
	activityType!: UserActivityType

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_32
	})
	status!: UserActivityStatus

	@Column({
		type: "timestamp"
	})
	date!: Date

	@Column({
		type: "integer",
		nullable: true,
		comment: "Hours worked. Used for Daily, Overtime, BusinessTrip, OnCall"
	})
	hours?: number | null

	//#region Daily Activity Properties

	@Column({
		type: "varchar",
		nullable: true,
		length: DB_VARCHAR_LENGTH_32
	})
	workLocation?: UserActivityWorkLocation | null

	//#endregion Daily Activity Properties

	@Column({
		type: "integer",
		comment: "Quick reference to the user"
	})
	userId!: number

	@Column({
		type: "integer",
		comment: "Quick reference to the reporter"
	})
	reportedByUserId!: number

	@Column({
		type: "integer",
		comment: "Quick reference to the reviewer",
		nullable: true
	})
	reviewedByUserId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to the project",
		nullable: true
	})
	projectId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to activity request",
		nullable: true
	})
	activityRequestId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to user working hours",
		nullable: true
	})
	workingHoursId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to business trip",
		nullable: true
	})
	businessTripId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to vacation",
		nullable: true
	})
	vacationId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to sick leave",
		nullable: true
	})
	sickLeaveId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to the user assigned vacations",
		nullable: true
	})
	vacationAssignedId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to performance review",
		nullable: true
	})
	performanceReviewId?: number | null

	@ManyToOne(() => UserEntity, user => user.userActivity)
	@JoinColumn({ name: "userId" })
	user!: UserEntity

	@ManyToOne(() => UserEntity, user => user.reportedByActivity)
	@JoinColumn({ name: "reportedByUserId" })
	reportedByUser?: UserEntity

	@ManyToOne(() => UserEntity, user => user.reviewedByActivity)
	@JoinColumn({ name: "reviewedByUserId" })
	reviewedByUser?: UserEntity

	@ManyToOne(() => ProjectEntity, project => project.userActivity)
	@JoinColumn({ name: "projectId" })
	project?: ProjectEntity

	@ManyToOne(() => UserActivityRequestEntity, activityRequest => activityRequest.userActivities)
	@JoinColumn({ name: "activityRequestId" })
	activityRequest?: UserActivityRequestEntity

	@OneToOne(() => UserWorkingHoursEntity, workingHours => workingHours.userActivities, { cascade: true, onDelete: "CASCADE", nullable: true })
	@JoinColumn({ name: "workingHoursId" })
	workingHours?: UserWorkingHoursEntity

	@ManyToOne(() => UserVacationAssignedEntity, userVacationAssigned => userVacationAssigned.vacations)
	@JoinColumn({ name: "vacationAssignedId" })
	userVacationAssigned?: UserVacationAssignedEntity

	@ManyToOne(() => UserPerformanceReviewEntity, preformanceReview => preformanceReview.activities)
	@JoinColumn({ name: "performanceReviewId" })
	performanceReview?: UserPerformanceReviewEntity

	@UpdateDateColumn()
	updatedAt!: Date

	@CreateDateColumn()
	createdAt!: Date
}
