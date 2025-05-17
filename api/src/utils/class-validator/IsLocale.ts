import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator"

/**
 * Checks if a given value is a real locale
 * @param validationOptions
 * @returns
 */
export function IsLocale(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: "IsLocale",
			target: object.constructor,
			propertyName: propertyName,
			options: {
				message: `${propertyName} must be either a two letters ISO 639-1 language code or a three letters ISO 639-2 language code`,
				...validationOptions
			},
			validator: {
				validate(value: unknown, _args: ValidationArguments) {
					if (typeof value !== "string") {
						return false
					}

					if (value.length === 2) {
						const localeNameInEnglish = new Intl.DisplayNames(["en"], { type: "language" }).of(value)
						if (localeNameInEnglish === value) {
							return false
						}

						return true
					}

					if (value.length === 5 && value[2] === "-") {
						const [locale, region] = value.split("-")

						const regionNameInEnglish = new Intl.DisplayNames(["en"], { type: "region" }).of(region)
						if (regionNameInEnglish === region) {
							return false
						}

						const localeNameInEnglish = new Intl.DisplayNames(["en"], { type: "language" }).of(locale)
						if (localeNameInEnglish === locale) {
							return false
						}

						return true
					}

					return false
				}
			}
		})
	}
}
