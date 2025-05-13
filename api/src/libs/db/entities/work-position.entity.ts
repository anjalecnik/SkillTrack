import { WorkPositionLevel } from "../../../utils/types/enums/work-position.enum"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { UserEntity } from "./user.entity"
import { ICreatedAtEntity, IUpdatedAtEntity } from "./interfaces/date.interface.entity"
import { ICreatedByUserIdEntity, IUpdatedByUserIdEntity } from "./interfaces/user-id.interface.entity"
import { DB_VARCHAR_LENGTH_128, DB_VARCHAR_LENGTH_4, DB_VARCHAR_LENGTH_256 } from "../../../utils/constants"

@Entity("work_position")
@Unique(["name", "level"])
export class WorkPositionEntity implements ICreatedByUserIdEntity, IUpdatedByUserIdEntity, ICreatedAtEntity, IUpdatedAtEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_128
	})
	name!: string

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_4
	})
	level!: WorkPositionLevel

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_256
	})
	description!: string

	@Column({
		type: "integer",
		comment: "Quick reference to the work position promotion",
		nullable: true
	})
	workPositionPromotionId?: number | null

	@Column({
		type: "integer",
		comment: "Quick reference to the user who created work position"
	})
	createdByUserId!: number

	@Column({
		type: "integer",
		comment: "Quick reference to the user who updated work position"
	})
	updatedByUserId!: number

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date

	@ManyToOne(() => UserEntity, user => user.workPositionCreatedBy)
	@JoinColumn({ name: "createdByUserId" })
	createdBy?: UserEntity

	@ManyToOne(() => UserEntity, user => user.workPositionUpdatedBy)
	@JoinColumn({ name: "updatedByUserId" })
	updatedBy?: UserEntity

	@OneToMany(() => UserEntity, user => user.workPosition, { cascade: true })
	user?: UserEntity[]

	@ManyToOne(() => WorkPositionEntity, workPosition => workPosition.childWorkPosition, { nullable: true })
	@JoinColumn({ name: "workPositionPromotionId" })
	parentWorkPosition?: WorkPositionEntity

	@OneToMany(() => WorkPositionEntity, workPosition => workPosition.parentWorkPosition, { nullable: true })
	childWorkPosition?: WorkPositionEntity[]
}
