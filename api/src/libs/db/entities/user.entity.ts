import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { UserStatus } from "../../../utils/types/enums/user-status.enum"
import { DB_VARCHAR_LENGTH_128, DB_VARCHAR_LENGTH_16, DB_VARCHAR_LENGTH_256, DB_VARCHAR_LENGTH_512 } from "../../../utils/constants"
import { UserRole } from "../../../utils/types/enums/user-role.enum"
import { WorkPositionEntity } from "./work-position.entity"
import { IDatesAllEntity } from "./interfaces/date.interface.entity"
import { IDeletedByUserIdEntity, IUpdatedByUserIdEntity, IInvitedByUserIdEntity } from "./interfaces/user-id.interface.entity"
import { UserActivityEntity } from "./user-activity.entity"
import { ProjectUserEntity } from "./project-user.entity"
import { ProjectEntity } from "./project.entity"
import { UserActivityRequestEntity } from "./user-activity-request.entity"
import { UserAddressEntity } from "./user-address.entity"
import { UserVacationAssignedEntity } from "./user-vacation-assigned.entity"
import { UserWorkingHoursEntity } from "./user-working-hours.entity"
import { UserPerformanceReviewEntity } from "./user-performance-review.entity"
import { NotificationEntity } from "./notification.entity"

@Entity("user")
@Unique("user_uq", ["email"])
export class UserEntity implements IDatesAllEntity, IDeletedByUserIdEntity, IUpdatedByUserIdEntity, IInvitedByUserIdEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_256,
		unique: true
	})
	email!: string

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_512,
		nullable: true
	})
	password!: string | null

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_16
	})
	status!: UserStatus

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_16,
		default: UserRole.User
	})
	role!: UserRole

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_128
	})
	name!: string

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_128
	})
	surname!: string

	@Column({
		type: "timestamp",
		nullable: true
	})
	birthDate?: Date | null

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_16,
		nullable: true
	})
	phone?: string | null

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date

	@DeleteDateColumn()
	deletedAt?: Date | null

	@Column({
		type: "integer",
		comment: "Quick reference to the work position",
		nullable: true
	})
	workPositionId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to the user who is manager",
		nullable: true
	})
	managerId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to the user who invited user",
		nullable: true
	})
	invitedByUserId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to the user who updated user",
		nullable: true
	})
	updatedByUserId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to the user who deleted user",
		nullable: true
	})
	deletedByUserId?: number | null

	@ManyToOne(() => WorkPositionEntity, position => position.user)
	@JoinColumn({ name: "workPositionId" })
	workPosition?: WorkPositionEntity

	@OneToMany(() => WorkPositionEntity, position => position.createdBy)
	workPositionCreatedBy?: WorkPositionEntity[]

	@OneToMany(() => WorkPositionEntity, position => position.updatedBy)
	workPositionUpdatedBy?: WorkPositionEntity[]

	@ManyToOne(() => UserEntity, user => user.subordinates)
	@JoinColumn({ name: "managerId" })
	manager?: UserEntity

	@OneToMany(() => UserEntity, user => user.manager)
	subordinates?: UserEntity[]

	@ManyToOne(() => UserEntity, user => user.childInvitedByUsers)
	@JoinColumn({ name: "invitedByUserId" })
	invitedByUser?: UserEntity

	@OneToMany(() => UserEntity, user => user.invitedByUser)
	childInvitedByUsers?: UserEntity[]

	@ManyToOne(() => UserEntity, user => user.childUpdatedByUsers)
	@JoinColumn({ name: "updatedByUserId" })
	updatedByUser?: UserEntity

	@OneToMany(() => UserEntity, user => user.updatedByUser)
	childUpdatedByUsers?: UserEntity[]

	@ManyToOne(() => UserEntity, user => user.childDeletedByUsers)
	@JoinColumn({ name: "deletedByUserId" })
	deletedByUser?: UserEntity

	@OneToMany(() => UserEntity, user => user.deletedByUser)
	childDeletedByUsers?: UserEntity[]

	@OneToMany(() => UserActivityEntity, userActivity => userActivity.user)
	userActivity?: UserActivityEntity[]

	@OneToMany(() => UserActivityEntity, userActivity => userActivity.reportedByUser)
	reportedByActivity?: UserActivityEntity[]

	@OneToMany(() => UserActivityEntity, userActivity => userActivity.reviewedByUser)
	reviewedByActivity?: UserActivityEntity[]

	@OneToMany(() => NotificationEntity, notification => notification.user)
	notifications?: NotificationEntity[]

	@OneToMany(() => ProjectUserEntity, projectUser => projectUser.user, { cascade: true })
	projects?: ProjectUserEntity[]

	@OneToMany(() => ProjectEntity, project => project.createdByUser)
	createdProjects?: ProjectEntity[]

	@OneToMany(() => ProjectEntity, project => project.updatedByUser)
	updatedProjects?: ProjectEntity[]

	@OneToMany(() => ProjectEntity, project => project.deletedByUser)
	deletedProjects?: ProjectEntity[]

	@OneToMany(() => UserActivityRequestEntity, activityRequest => activityRequest.user)
	activityRequests?: UserActivityRequestEntity[]

	@OneToMany(() => UserActivityRequestEntity, activityRequest => activityRequest.reportedByUser)
	reportedActivityRequests?: UserActivityRequestEntity[]

	@OneToMany(() => UserActivityRequestEntity, activityRequest => activityRequest.reviewedByUser)
	reviewedActivityRequests?: UserActivityRequestEntity[]

	@OneToMany(() => UserAddressEntity, addresses => addresses.user, { cascade: true })
	addresses?: UserAddressEntity[]

	@OneToMany(() => UserAddressEntity, addresses => addresses.createdByUser)
	createdAddresses?: UserAddressEntity[]

	@OneToMany(() => UserAddressEntity, addresses => addresses.updatedByUser)
	updatedAddresses?: UserAddressEntity[]

	@OneToMany(() => UserAddressEntity, addresses => addresses.deletedByUser)
	deletedAddresses?: UserAddressEntity[]

	@OneToMany(() => UserVacationAssignedEntity, userVacationAssigned => userVacationAssigned.user, { cascade: true })
	assignedVacations?: UserVacationAssignedEntity[]

	@OneToMany(() => UserVacationAssignedEntity, userVacationAssigned => userVacationAssigned.createdByUser)
	createdAssignedVacations?: UserVacationAssignedEntity[]

	@OneToMany(() => UserVacationAssignedEntity, userVacationAssigned => userVacationAssigned.updatedByUser)
	updatedAssignedVacations?: UserVacationAssignedEntity[]

	@OneToMany(() => UserWorkingHoursEntity, workingHours => workingHours.user)
	workingHours?: UserWorkingHoursEntity[]

	@OneToMany(() => UserPerformanceReviewEntity, userPerformanceReview => userPerformanceReview.user, { cascade: true })
	performanceReviews?: UserPerformanceReviewEntity[]
}
