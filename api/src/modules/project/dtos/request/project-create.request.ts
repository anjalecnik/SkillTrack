import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength } from "class-validator"
import { DB_VARCHAR_LENGTH_64 } from "src/utils/constants"

export class ProjectCreateRequest {
	@ApiProperty({ description: "Name of project", example: "Jam system jam downtown studio project" })
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_64)
	name!: string
}
