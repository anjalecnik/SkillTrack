import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { ICreatedAtEntity, IDeletedAtEntity } from "./interfaces/date.interface.entity"
import { DB_VARCHAR_LENGTH_32 } from "../../../utils/constants"
import { ProjectUserRole } from "../../../utils/types/enums/project-user-role.enum"
import { ProjectEntity } from "./project.entity"
import { UserEntity } from "./user.entity"

@Entity("project_jt_user")
@Index(["projectId", "userId"], { unique: true, where: '"deletedAt" IS NULL' })
export class ProjectUserEntity implements ICreatedAtEntity, IDeletedAtEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_32
	})
	role!: ProjectUserRole

	@Column({
		type: "integer",
		default: 100
	})
	assignedPercentage!: number

	@CreateDateColumn()
	createdAt!: Date

	@DeleteDateColumn()
	deletedAt?: Date | null

	// References
	@Column({
		type: "integer",
		comment: "Quick reference to project"
	})
	projectId!: number

	@Column({
		type: "integer",
		comment: "Quick reference to user"
	})
	userId!: number

	// Relations
	@ManyToOne(() => ProjectEntity, project => project.users, { orphanedRowAction: "soft-delete" })
	@JoinColumn({ name: "projectId" })
	project?: ProjectEntity

	@ManyToOne(() => UserEntity, user => user.projects, { orphanedRowAction: "soft-delete" })
	@JoinColumn({ name: "userId" })
	user?: UserEntity
}
