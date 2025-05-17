import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"

@ValidatorConstraint({ name: "isAfterOrEqualDate", async: false })
export class IsAfterOrEqualDate implements ValidatorConstraintInterface {
	validate(propertyValue: Date, args: ValidationArguments) {
		const rootObject = args.object as Record<string, Date>
		const propertyName = args?.constraints?.[0] as string

		if (rootObject[propertyName] == null) {
			return true
		}

		return new Date(propertyValue).getTime() >= new Date(rootObject[propertyName]).getTime()
	}

	defaultMessage(args: ValidationArguments) {
		return `"${args.property}" must be equal or after "${args.constraints[0] as string}"`
	}
}
