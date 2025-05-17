import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator"
import { ParseOptionalBoolean, ParseParamArray } from "src/utils/class-transformer"
import { PaginationPropsRequest } from "src/utils/types/dtos"
import { UserStatus } from "src/utils/types/enums/user-status.enum"
import { ISortingFieldUser, sortingFieldUserValidationArray } from "../../interfaces"

export class UserPaginationFilterRequest extends PaginationPropsRequest {
	@ApiPropertyOptional({ example: 1 })
	@IsOptional()
	@ParseParamArray()
	@IsInt({ each: true })
	@IsPositive({ each: true })
	@Type(() => Number)
	@IsArray()
	ids?: number[]

	@ApiPropertyOptional({ example: UserStatus.Active })
	@IsEnum(UserStatus, { each: true })
	@IsOptional()
	@ParseParamArray()
	@IsArray()
	statuses?: UserStatus[]

	@ApiPropertyOptional({ example: "Bob" })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	fullName?: string

	@ApiPropertyOptional({ example: "id" })
	@IsString()
	@IsIn(sortingFieldUserValidationArray)
	@IsOptional()
	sort?: ISortingFieldUser = "id"

	@ApiPropertyOptional()
	@IsOptional()
	@ParseOptionalBoolean()
	metadata?: boolean
}
