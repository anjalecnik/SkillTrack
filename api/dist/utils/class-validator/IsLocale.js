"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsLocale = void 0;
const class_validator_1 = require("class-validator");
function IsLocale(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "IsLocale",
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: `${propertyName} must be either a two letters ISO 639-1 language code or a three letters ISO 639-2 language code`,
                ...validationOptions
            },
            validator: {
                validate(value, _args) {
                    if (typeof value !== "string") {
                        return false;
                    }
                    if (value.length === 2) {
                        const localeNameInEnglish = new Intl.DisplayNames(["en"], { type: "language" }).of(value);
                        if (localeNameInEnglish === value) {
                            return false;
                        }
                        return true;
                    }
                    if (value.length === 5 && value[2] === "-") {
                        const [locale, region] = value.split("-");
                        const regionNameInEnglish = new Intl.DisplayNames(["en"], { type: "region" }).of(region);
                        if (regionNameInEnglish === region) {
                            return false;
                        }
                        const localeNameInEnglish = new Intl.DisplayNames(["en"], { type: "language" }).of(locale);
                        if (localeNameInEnglish === locale) {
                            return false;
                        }
                        return true;
                    }
                    return false;
                }
            }
        });
    };
}
exports.IsLocale = IsLocale;
//# sourceMappingURL=IsLocale.js.map