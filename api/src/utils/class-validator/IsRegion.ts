import { registerDecorator, ValidationArguments } from "class-validator"
import Holidays from "date-holidays"

export function IsRegion(countryCodeProperty: string, stateProperty: string) {
	/* eslint-disable @typescript-eslint/ban-types */
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: "isRegion",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [countryCodeProperty, stateProperty],
			validator: {
				validate(region: string, args: ValidationArguments) {
					const countryCode = (args.object as Record<string, string>)[args.constraints[0]]
					const state = (args.object as Record<string, string>)[args.constraints[1]]
					const holidaysRegionObject = new Holidays().getRegions(countryCode, state)

					if (holidaysRegionObject === undefined) return false
					if (!(region in holidaysRegionObject)) return false

					return true
				},

				defaultMessage(args: ValidationArguments) {
					const state = (args.object as Record<string, string>)[args.constraints[1]]

					if (!state) return "state must be defined when region is specified"

					return `'${args.value as string}' is not valid region for state '${state}'`
				}
			}
		})
	}
}
