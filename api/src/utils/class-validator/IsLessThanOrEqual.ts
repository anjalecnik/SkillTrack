import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"

@ValidatorConstraint({ name: "isLessThanOrEqual", async: false })
export class IsLessThanOrEqual implements ValidatorConstraintInterface {
	validate(propertyValue: number, args: ValidationArguments) {
		const rootObject = args.object as Record<string, number>
		const propertyName = args?.constraints?.[0] as string

		if (!rootObject[propertyName]) {
			return true
		}

		return propertyValue <= rootObject[propertyName]
	}

	defaultMessage(args: ValidationArguments) {
		return `"${args.property}" must be less than or equal "${args.constraints[0] as string}"`
	}
}
