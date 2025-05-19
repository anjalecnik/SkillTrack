import { BadRequestException } from "@nestjs/common"
import { Transform } from "class-transformer"
import { isISO8601 } from "class-validator"

export const DateToMMDDFormat = () =>
	Transform(({ value, key }) => {
		// Length must be at least 10 to satisfy YYYY-MM-DD format
		if (!isISO8601(value) || (value as string).length < 10) {
			throw new BadRequestException(`${key} must be a valid date or timestamp`)
		}

		const date = new Date(value)
		const day = date.getDate().toString().padStart(2, "0")
		const month = (date.getMonth() + 1).toString().padStart(2, "0") // "getMonth()" return jan as 0 ... Dec as 11, that's why increment

		return month + "-" + day
	}, {})
