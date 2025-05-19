import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator"

/**
 * Checks if a given value is a real country
 * @param validationOptions
 * @returns
 */
export function IsCountryCode(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: "IsCountryCode",
			target: object.constructor,
			propertyName: propertyName,
			options: {
				message: `${propertyName} must be defined in ISO 3166-1 alpha-2 standard`,
				...validationOptions
			},
			validator: {
				validate(value: unknown, _args: ValidationArguments) {
					if (typeof value !== "string") {
						return false
					}

					if (value.length !== 2 || value !== value.toUpperCase()) {
						return false
					}

					const regionNameInEnglish = new Intl.DisplayNames(["en"], { type: "region" }).of(value)
					if (regionNameInEnglish === value) {
						return false
					}

					return true
				}
			}
		})
	}
}
