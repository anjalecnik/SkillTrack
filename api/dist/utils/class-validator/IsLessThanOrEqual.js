"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsLessThanOrEqual = void 0;
const class_validator_1 = require("class-validator");
let IsLessThanOrEqual = class IsLessThanOrEqual {
    validate(propertyValue, args) {
        const rootObject = args.object;
        const propertyName = args?.constraints?.[0];
        if (!rootObject[propertyName]) {
            return true;
        }
        return propertyValue <= rootObject[propertyName];
    }
    defaultMessage(args) {
        return `"${args.property}" must be less than or equal "${args.constraints[0]}"`;
    }
};
exports.IsLessThanOrEqual = IsLessThanOrEqual;
exports.IsLessThanOrEqual = IsLessThanOrEqual = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "isLessThanOrEqual", async: false })
], IsLessThanOrEqual);
//# sourceMappingURL=IsLessThanOrEqual.js.map