import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
export declare class IsAfterTime implements ValidatorConstraintInterface {
    validate(propertyValue: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
