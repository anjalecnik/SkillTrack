import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
export declare class IsAfterOrEqualDate implements ValidatorConstraintInterface {
    validate(propertyValue: Date, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
