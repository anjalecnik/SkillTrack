"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsRegion = IsRegion;
const class_validator_1 = require("class-validator");
const date_holidays_1 = __importDefault(require("date-holidays"));
function IsRegion(countryCodeProperty, stateProperty) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isRegion",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [countryCodeProperty, stateProperty],
            validator: {
                validate(region, args) {
                    const countryCode = args.object[args.constraints[0]];
                    const state = args.object[args.constraints[1]];
                    const holidaysRegionObject = new date_holidays_1.default().getRegions(countryCode, state);
                    if (holidaysRegionObject === undefined)
                        return false;
                    if (!(region in holidaysRegionObject))
                        return false;
                    return true;
                },
                defaultMessage(args) {
                    const state = args.object[args.constraints[1]];
                    if (!state)
                        return "state must be defined when region is specified";
                    return `'${args.value}' is not valid region for state '${state}'`;
                }
            }
        });
    };
}
//# sourceMappingURL=IsRegion.js.map