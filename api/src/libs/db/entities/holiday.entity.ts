import { DB_VARCHAR_LENGTH_128, DB_VARCHAR_LENGTH_2, DB_VARCHAR_LENGTH_16 } from "../../../utils/constants"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { DateTransformerHelper } from "../helpers/date-transformer.helper"
import { ICreatedAtEntity, IUpdatedAtEntity } from "./interfaces/date.interface.entity"

@Entity("holiday")
@Unique(["name", "date", "countryCode", "state", "region"])
export class HolidayEntity implements ICreatedAtEntity, IUpdatedAtEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_128
	})
	name!: string

	@Column({
		type: "date",
		transformer: DateTransformerHelper
	})
	date!: Date

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_2
	})
	countryCode!: string

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_16,
		nullable: true
	})
	state?: string | null

	@Column({
		type: "varchar",
		length: DB_VARCHAR_LENGTH_16,
		nullable: true
	})
	region?: string | null

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date
}
