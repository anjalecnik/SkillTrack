import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator"

/**
 * Checks if a given value is "asc" or "desc"
 * @param validationOptions
 * @returns
 */
export function IsSortingDir(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: "IsSortingDir",
			target: object.constructor,
			propertyName: propertyName,
			options: {
				message: `${propertyName} must be either "asc" or "desc"`,
				...validationOptions
			},
			validator: {
				validate(value: unknown, _args: ValidationArguments) {
					if (typeof value !== "string") {
						return false
					}

					if (!["asc", "desc"].includes(value)) {
						return false
					}

					return true
				}
			}
		})
	}
}
