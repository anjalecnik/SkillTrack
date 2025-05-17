import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"

@ValidatorConstraint({ name: "isBeforeDate", async: false })
export class IsBeforeDate implements ValidatorConstraintInterface {
	validate(propertyValue: string, args: ValidationArguments) {
		const rootObject = args.object as Record<string, string>
		const propertyName = args.constraints[0] as string
		return propertyValue < rootObject[propertyName]
	}

	defaultMessage(args: ValidationArguments) {
		return `"${args.property}" must be before "${args.constraints[0] as string}"`
	}
}
