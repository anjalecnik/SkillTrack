"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsState = IsState;
const class_validator_1 = require("class-validator");
const date_holidays_1 = __importDefault(require("date-holidays"));
function IsState(countryCodeProperty) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isState",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [countryCodeProperty],
            validator: {
                validate(state, args) {
                    const countryCode = args.object[args.constraints[0]];
                    const holidaysStateObject = new date_holidays_1.default().getStates(countryCode);
                    if (holidaysStateObject === undefined)
                        return false;
                    if (!(state in holidaysStateObject))
                        return false;
                    return true;
                },
                defaultMessage(args) {
                    const countryCode = args.object[args.constraints[0]];
                    return `'${args.value}' is not valid state for countryCode '${countryCode}'`;
                }
            }
        });
    };
}
//# sourceMappingURL=IsState.js.map