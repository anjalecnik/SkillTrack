import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { DateTimeWithoutTimezoneRequest } from "../types/dtos";
export declare class IsBeforeDateWithoutTimezone implements ValidatorConstraintInterface {
    validate(propertyValue: DateTimeWithoutTimezoneRequest, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
