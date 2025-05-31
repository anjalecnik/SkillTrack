"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsSortingDir = IsSortingDir;
const class_validator_1 = require("class-validator");
function IsSortingDir(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "IsSortingDir",
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: `${propertyName} must be either "asc" or "desc"`,
                ...validationOptions
            },
            validator: {
                validate(value, _args) {
                    if (typeof value !== "string") {
                        return false;
                    }
                    if (!["asc", "desc"].includes(value)) {
                        return false;
                    }
                    return true;
                }
            }
        });
    };
}
//# sourceMappingURL=IsSortingDir.js.map