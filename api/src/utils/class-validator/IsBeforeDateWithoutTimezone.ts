import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"
import { DateTimeWithoutTimezoneRequest } from "../types/dtos"
import { DateHelper } from "../helpers/date.helper"

@ValidatorConstraint({ name: "isBeforeDateWithoutTimezone", async: false })
export class IsBeforeDateWithoutTimezone implements ValidatorConstraintInterface {
	validate(propertyValue: DateTimeWithoutTimezoneRequest, args: ValidationArguments) {
		const rootObject = args.object as Record<string, DateTimeWithoutTimezoneRequest>
		const propertyName = args.constraints[0] as string
		const dateBeforeString = `${propertyValue.date}T${propertyValue.time}`
		const dateAfterString = `${rootObject[propertyName].date}T${rootObject[propertyName].time}`

		return DateHelper.isDateAfterDate(new Date(dateBeforeString), new Date(dateAfterString))
	}

	defaultMessage(args: ValidationArguments) {
		return `"${args.property}" must be before "${args.constraints[0] as string}"`
	}
}
