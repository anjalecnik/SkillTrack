/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class TeamDto {
	@ApiProperty({ example: 1 })
	@IsNotEmpty()
	@IsInt()
	id!: number

	@ApiProperty({ example: "Name" })
	@IsNotEmpty()
	@IsString()
	name!: string

	@ApiProperty({ example: "Description" })
	@IsNotEmpty()
	@IsString()
	description!: string

	@ApiProperty({ example: "User" })
	@IsOptional()
	@IsString()
	@Length(1, 255)
	createdBy!: string | null

	@ApiPropertyOptional({ example: "User" })
	@IsOptional()
	@IsString()
	@Length(1, 255)
	modifiedBy?: string | null
}

export class CreateTeamDto extends OmitType(TeamDto, ["id"]) {}
export class UpdateTeamDto extends PartialType(TeamDto) {}
