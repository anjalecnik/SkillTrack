"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCountryCode = IsCountryCode;
const class_validator_1 = require("class-validator");
function IsCountryCode(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "IsCountryCode",
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: `${propertyName} must be defined in ISO 3166-1 alpha-2 standard`,
                ...validationOptions
            },
            validator: {
                validate(value, _args) {
                    if (typeof value !== "string") {
                        return false;
                    }
                    if (value.length !== 2 || value !== value.toUpperCase()) {
                        return false;
                    }
                    const regionNameInEnglish = new Intl.DisplayNames(["en"], { type: "region" }).of(value);
                    if (regionNameInEnglish === value) {
                        return false;
                    }
                    return true;
                }
            }
        });
    };
}
//# sourceMappingURL=IsCountryCode.js.map