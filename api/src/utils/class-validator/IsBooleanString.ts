import { registerDecorator, ValidationArguments } from "class-validator"

export const booleanMapper = new Map<string, boolean>([
	["true", true],
	["false", false]
])

export function isBooleanString(value: string): boolean {
	return booleanMapper.get(value.toLowerCase()) !== undefined
}

export function IsBooleanString() {
	return function (object: object, propertyName: string) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		registerDecorator({
			name: "isBooleanString",
			target: object.constructor,
			propertyName: propertyName,
			validator: {
				validate(value: string) {
					return isBooleanString(value)
				},

				defaultMessage(args: ValidationArguments) {
					return `'${args.property}' must be a boolean string ("true" or "false")`
				}
			}
		})
	}
}
