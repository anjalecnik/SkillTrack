import { BadRequestException } from "@nestjs/common"
import { Transform } from "class-transformer"
import { isISO8601, isMilitaryTime, length } from "class-validator"
import dayjs from "dayjs"
import { DateTimeWithoutTimezoneRequest } from "../types/dtos"

export function validateIsoDate(date: string, key: string, dateLength: number): void {
	if (!isISO8601(date, { strict: true })) {
		throw new BadRequestException(`${key} must be a valid ISO8601 date`)
	}
	if (!length(date, dateLength, dateLength)) {
		throw new BadRequestException(`${key} length must be equal to 10`)
	}
}

function validateIsoTime(time: string, key: string): void {
	if (!isMilitaryTime(time)) {
		throw new BadRequestException(`${key} must be a valid Military time MM:HH`)
	}
}

export const IsoDateObjectToUtcDate = () =>
	Transform(({ value, key }) => {
		if (value === null) {
			return null
		}

		if (Object.keys(value as object).length !== 2) {
			throw new BadRequestException(`${key} must have 'date' and 'time' properties`)
		}
		if (!(value as DateTimeWithoutTimezoneRequest).date) {
			throw new BadRequestException(`${key} must must have 'date' property`)
		}
		if (!(value as DateTimeWithoutTimezoneRequest).time) {
			throw new BadRequestException(`${key} must must have 'time' property`)
		}

		const dateObject = value as DateTimeWithoutTimezoneRequest
		validateIsoDate(dateObject.date, key, 10)
		validateIsoTime(dateObject.time, key)

		return dayjs(`${dateObject.date}T${dateObject.time}`).toDate()
	}, {})
