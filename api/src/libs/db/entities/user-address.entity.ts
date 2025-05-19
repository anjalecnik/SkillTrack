import { DB_VARCHAR_LENGTH_256, DB_VARCHAR_LENGTH_128, DB_VARCHAR_LENGTH_16, DB_VARCHAR_LENGTH_2 } from "../../../utils/constants"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { IDatesAllEntity } from "./interfaces/date.interface.entity"
import { ICreatedUpdatedDeletedByUserIdEntity } from "./interfaces/user-id.interface.entity"
import { UserAddressType } from "../../../utils/types/enums/user-address.enum"
import { UserEntity } from "./user.entity"

@Entity("user_address")
export class UserAddressEntity implements ICreatedUpdatedDeletedByUserIdEntity, IDatesAllEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_256
	})
	streetAddress!: string

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_128 // Longest city in the world has 85 characters
	})
	city!: string

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_128,
		nullable: true
	})
	state?: string | null

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_16,
		nullable: true
	})
	postalCode?: string | null

	@Column({
		type: "char",
		length: DB_VARCHAR_LENGTH_2
	})
	countryCode!: string

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_16,
		default: UserAddressType.Main
	})
	type!: UserAddressType

	@Column({
		type: "integer",
		comment: "Quick reference to user"
	})
	userId!: number

	@Column({
		type: "integer",
		comment: "Quick reference to the user who created user address"
	})
	createdByUserId!: number

	@Column({
		type: "integer",
		comment: "Quick reference to the user who updated user address"
	})
	updatedByUserId!: number

	@Column({
		type: "integer",
		comment: "Quick reference to the user who deleted user address",
		nullable: true
	})
	deletedByUserId?: number | null

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date

	@DeleteDateColumn()
	deletedAt?: Date | null

	@ManyToOne(() => UserEntity, user => user.addresses, { orphanedRowAction: "soft-delete" })
	@JoinColumn({ name: "userId" })
	user?: UserEntity

	@ManyToOne(() => UserEntity, user => user.createdAddresses)
	@JoinColumn({ name: "createdByUserId" })
	createdByUser?: UserEntity

	@ManyToOne(() => UserEntity, user => user.updatedAddresses)
	@JoinColumn({ name: "updatedByUserId" })
	updatedByUser?: UserEntity

	@ManyToOne(() => UserEntity, user => user.deletedAddresses)
	@JoinColumn({ name: "deletedByUserId" })
	deletedByUser?: UserEntity
}
