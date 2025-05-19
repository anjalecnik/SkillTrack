import { DB_VARCHAR_LENGTH_32, DB_VARCHAR_LENGTH_64 } from "../../../utils/constants"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { IDatesAllEntity } from "./interfaces/date.interface.entity"
import { ICreatedUpdatedDeletedByUserIdEntity } from "./interfaces/user-id.interface.entity"
import { ProjectType } from "../../../utils/types/enums/project.enum"
import { UserEntity } from "./user.entity"
import { UserActivityEntity } from "./user-activity.entity"
import { ProjectUserEntity } from "./project-user.entity"
import { UserActivityRequestEntity } from "./user-activity-request.entity"

@Entity("project")
export class ProjectEntity implements IDatesAllEntity, ICreatedUpdatedDeletedByUserIdEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_64
	})
	name!: string

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_32,
		nullable: true
	})
	type?: ProjectType | null

	@Column({
		type: "timestamp"
	})
	dateStart!: Date

	@Column({
		type: "timestamp",
		nullable: true
	})
	dateEnd!: Date | null

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date

	@DeleteDateColumn()
	deletedAt?: Date | null

	@Column({
		type: "integer",
		comment: "Quick reference to the user who created project"
	})
	createdByUserId!: number

	@Column({
		type: "integer",
		comment: "Quick reference to the user who updated project"
	})
	updatedByUserId!: number

	@Column({
		type: "integer",
		comment: "Quick reference to the user who deleted project",
		nullable: true
	})
	deletedByUserId?: number | null

	// Relations
	@ManyToOne(() => UserEntity, user => user.createdProjects)
	@JoinColumn({ name: "createdByUserId" })
	createdByUser?: UserEntity

	@ManyToOne(() => UserEntity, user => user.updatedProjects)
	@JoinColumn({ name: "updatedByUserId" })
	updatedByUser?: UserEntity

	@ManyToOne(() => UserEntity, user => user.deletedProjects)
	@JoinColumn({ name: "deletedByUserId" })
	deletedByUser?: UserEntity

	@OneToMany(() => ProjectUserEntity, projectUser => projectUser.project, { cascade: true })
	users?: ProjectUserEntity[]

	@OneToMany(() => UserActivityEntity, userActivity => userActivity.project)
	userActivity?: UserActivityEntity[]

	@OneToMany(() => UserActivityRequestEntity, activityRequest => activityRequest.project, { cascade: true })
	activityRequests?: UserActivityRequestEntity[]
}
