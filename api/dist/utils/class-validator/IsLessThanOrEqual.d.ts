import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
export declare class IsLessThanOrEqual implements ValidatorConstraintInterface {
    validate(propertyValue: number, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
