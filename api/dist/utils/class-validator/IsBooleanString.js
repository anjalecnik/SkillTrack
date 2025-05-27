"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBooleanString = exports.isBooleanString = exports.booleanMapper = void 0;
const class_validator_1 = require("class-validator");
exports.booleanMapper = new Map([
    ["true", true],
    ["false", false]
]);
function isBooleanString(value) {
    return exports.booleanMapper.get(value.toLowerCase()) !== undefined;
}
exports.isBooleanString = isBooleanString;
function IsBooleanString() {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isBooleanString",
            target: object.constructor,
            propertyName: propertyName,
            validator: {
                validate(value) {
                    return isBooleanString(value);
                },
                defaultMessage(args) {
                    return `'${args.property}' must be a boolean string ("true" or "false")`;
                }
            }
        });
    };
}
exports.IsBooleanString = IsBooleanString;
//# sourceMappingURL=IsBooleanString.js.map