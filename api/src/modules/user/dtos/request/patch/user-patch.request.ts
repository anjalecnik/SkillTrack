import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsPositive, IsString, MaxLength, MinDate, ValidateNested } from "class-validator"
import { DB_VARCHAR_LENGTH_128 } from "src/utils/constants"
import { UserStatus } from "src/utils/types/enums/user-status.enum"
import { UserProjectPatchRequest } from "./user-project-patch.request"
import { UserAddressPatchRequest } from "src/modules/user/modules/user-address/dtos/request/user-address-patch.request"
import { UserAssignedVacationPatchRequest } from "src/modules/user/modules/user-assigned-vacation/dtos/request/user-assigned-vacation-patch.request"

export class UserPatchRequest {
	@ApiPropertyOptional({ example: "Joe" })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_128)
	name?: string

	@ApiPropertyOptional({ example: "Mishica" })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MaxLength(DB_VARCHAR_LENGTH_128)
	surname?: string

	@ApiPropertyOptional({ example: "2023-05-15" })
	@IsOptional()
	@MinDate(new Date("1900-01-01"))
	@IsDate()
	@Type(() => Date)
	birthDate?: Date

	@ApiPropertyOptional({ example: "+38641853888" })
	@IsOptional()
	@IsPhoneNumber()
	phone?: string

	@ApiPropertyOptional({ example: 2 })
	@IsInt()
	@IsPositive()
	@IsOptional()
	teamId?: number

	@ApiPropertyOptional({ example: 3 })
	@IsInt()
	@IsPositive()
	@IsOptional()
	workPositionId?: number

	@ApiPropertyOptional({ example: 8 })
	@IsInt()
	@IsPositive()
	@IsOptional()
	managerId?: number

	@ApiPropertyOptional({ type: UserAddressPatchRequest, isArray: true })
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UserAddressPatchRequest)
	addresses?: UserAddressPatchRequest[]

	@ApiPropertyOptional({ type: UserProjectPatchRequest, isArray: true })
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UserProjectPatchRequest)
	projects?: UserProjectPatchRequest[]

	@ApiPropertyOptional({ type: UserAssignedVacationPatchRequest, isArray: true })
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UserAssignedVacationPatchRequest)
	assignedVacations?: UserAssignedVacationPatchRequest[]

	@ApiPropertyOptional({ example: UserStatus.Active })
	@IsEnum(UserStatus)
	@IsOptional()
	status?: UserStatus
}
