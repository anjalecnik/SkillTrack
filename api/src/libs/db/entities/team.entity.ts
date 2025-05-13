import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { UserEntity } from "./user.entity"

@Entity("team")
export class TeamEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({
		type: "varchar",
		length: 150
	})
	name!: string

	@Column({
		type: "varchar",
		length: 150
	})
	description!: string

	@Column({
		type: "varchar",
		length: 255,
		nullable: true
	})
	createdBy!: string | null

	@Column({
		type: "varchar",
		length: 255,
		nullable: true
	})
	modifiedBy!: string | null

	@CreateDateColumn()
	createDate!: Date

	@UpdateDateColumn()
	updateDate!: Date

	@DeleteDateColumn()
	deleteDate!: Date

	@OneToMany(() => UserEntity, user => user, { cascade: true })
	user?: UserEntity[]
}
