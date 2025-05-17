import { Transform } from "class-transformer"
import dayjs from "dayjs"
import { validateIsoDate } from "./iso-date-object-to-utc-date"

export const IsoDateStringToUtcDate = (dateLength: number) =>
	Transform(({ value, key }) => {
		if (value === null) {
			return null
		}

		if (Array.isArray(value)) {
			return value.map(dateStr => {
				validateIsoDate(dateStr, key, dateLength)
				return dayjs(dateStr).toDate()
			})
		}

		validateIsoDate(value as string, key, dateLength)
		return dayjs(value as string).toDate()
	}, {})
