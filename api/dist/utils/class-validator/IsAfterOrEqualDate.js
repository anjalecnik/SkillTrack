"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAfterOrEqualDate = void 0;
const class_validator_1 = require("class-validator");
let IsAfterOrEqualDate = class IsAfterOrEqualDate {
    validate(propertyValue, args) {
        const rootObject = args.object;
        const propertyName = args?.constraints?.[0];
        if (rootObject[propertyName] == null) {
            return true;
        }
        return new Date(propertyValue).getTime() >= new Date(rootObject[propertyName]).getTime();
    }
    defaultMessage(args) {
        return `"${args.property}" must be equal or after "${args.constraints[0]}"`;
    }
};
exports.IsAfterOrEqualDate = IsAfterOrEqualDate;
exports.IsAfterOrEqualDate = IsAfterOrEqualDate = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "isAfterOrEqualDate", async: false })
], IsAfterOrEqualDate);
//# sourceMappingURL=IsAfterOrEqualDate.js.map