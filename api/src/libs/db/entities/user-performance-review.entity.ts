import { DB_VARCHAR_LENGTH_16 } from "../../../utils/constants"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { ICreatedAtEntity, IUpdatedAtEntity } from "./interfaces/date.interface.entity"
import { UserPerformanceReviewQuartal } from "../../../utils/types/enums/user-performance-review-quartal.enum"
import { UserEntity } from "./user.entity"
import { UserActivityEntity } from "./user-activity.entity"

@Entity("user_performance_review")
export class UserPerformanceReviewEntity implements ICreatedAtEntity, IUpdatedAtEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({
		type: "integer"
	})
	answer1!: number

	@Column({
		type: "integer"
	})
	answer2!: number

	@Column({
		type: "boolean"
	})
	answer3!: boolean

	@Column({
		type: "boolean"
	})
	answer4!: boolean

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_16
	})
	quartal!: UserPerformanceReviewQuartal

	@Column({
		type: "integer"
	})
	year!: number

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date

	@Column({
		type: "integer",
		comment: "Quick reference to the user"
	})
	userId!: number

	@ManyToOne(() => UserEntity, user => user.performanceReviews)
	@JoinColumn({ name: "userId" })
	user?: UserEntity

	@OneToMany(() => UserActivityEntity, activity => activity.performanceReview)
	activities!: UserActivityEntity[]
}
