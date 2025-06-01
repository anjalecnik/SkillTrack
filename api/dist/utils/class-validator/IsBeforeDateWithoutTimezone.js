"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBeforeDateWithoutTimezone = void 0;
const class_validator_1 = require("class-validator");
const date_helper_1 = require("../helpers/date.helper");
let IsBeforeDateWithoutTimezone = class IsBeforeDateWithoutTimezone {
    validate(propertyValue, args) {
        const rootObject = args.object;
        const propertyName = args.constraints[0];
        const dateBeforeString = `${propertyValue.date}T${propertyValue.time}`;
        const dateAfterString = `${rootObject[propertyName].date}T${rootObject[propertyName].time}`;
        return date_helper_1.DateHelper.isDateAfterDate(new Date(dateBeforeString), new Date(dateAfterString));
    }
    defaultMessage(args) {
        return `"${args.property}" must be before "${args.constraints[0]}"`;
    }
};
exports.IsBeforeDateWithoutTimezone = IsBeforeDateWithoutTimezone;
exports.IsBeforeDateWithoutTimezone = IsBeforeDateWithoutTimezone = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "isBeforeDateWithoutTimezone", async: false })
], IsBeforeDateWithoutTimezone);
//# sourceMappingURL=IsBeforeDateWithoutTimezone.js.map