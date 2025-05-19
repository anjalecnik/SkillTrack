import { DB_VARCHAR_LENGTH_32 } from "../../../utils/constants"
import { UserWorkingHoursType } from "../../../utils/types/enums/user-working-hours.enum"
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from "./user.entity"
import { UserActivityEntity } from "./user-activity.entity"

@Entity("user_working_hours")
export class UserWorkingHoursEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_32
	})
	type!: UserWorkingHoursType

	@Column({
		type: "timestamp"
	})
	fromDateStart!: Date

	@Column({
		type: "timestamp",
		nullable: true
	})
	toDateEnd!: Date | null

	// References
	@Column({
		type: "integer",
		comment: "Quick reference to the user"
	})
	userId!: number

	// Relations
	@ManyToOne(() => UserEntity, user => user.workingHours)
	@JoinColumn({ name: "userId" })
	user?: UserEntity

	@OneToOne(() => UserActivityEntity, activity => activity.workingHours)
	userActivities?: UserActivityEntity
}
