import { registerDecorator, ValidationArguments } from "class-validator"
import Holidays from "date-holidays"

export function IsState(countryCodeProperty: string) {
	/* eslint-disable @typescript-eslint/ban-types */
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: "isState",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [countryCodeProperty],
			validator: {
				validate(state: string, args: ValidationArguments) {
					const countryCode = (args.object as Record<string, string>)[args.constraints[0]]
					const holidaysStateObject = new Holidays().getStates(countryCode)

					if (holidaysStateObject === undefined) return false
					if (!(state in holidaysStateObject)) return false

					return true
				},

				defaultMessage(args: ValidationArguments) {
					const countryCode = (args.object as Record<string, string>)[args.constraints[0]]

					return `'${args.value as string}' is not valid state for countryCode '${countryCode}'`
				}
			}
		})
	}
}
