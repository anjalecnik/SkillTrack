import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { HalResourceResponse, HalResourceStandardResponse } from "./hal.response"

export class UserEmbeddedWorkPositionItemsHalResponse extends HalResourceResponse {
	@ApiProperty({ example: 1 })
	id!: number

	@ApiProperty({ example: "BE Developer" })
	name!: string
}

export class UserEmbeddedItemsHalResponse extends HalResourceStandardResponse {
	@ApiProperty({ type: UserEmbeddedWorkPositionItemsHalResponse })
	workPosition?: UserEmbeddedWorkPositionItemsHalResponse
}

export class UserShortHalResponse extends HalResourceResponse {
	@ApiProperty({ example: 1 })
	id!: number

	@ApiProperty({ example: "Bob" })
	name!: string

	@ApiProperty({ example: "Builder" })
	surname!: string

	@ApiPropertyOptional({ example: "inova@inova.si" })
	email?: string

	@ApiProperty({ type: UserEmbeddedItemsHalResponse })
	declare _embedded?: UserEmbeddedItemsHalResponse
}
