import { DefaultValues } from "./classes/config.default-values.class";
import { EnvironmentVariables } from "./classes/config.environment-variables.class";
declare class ConfigClass {
    private defaultValues;
    constructor();
    get<T extends string | number | boolean | string[]>(configName: keyof EnvironmentVariables | keyof DefaultValues): T;
    private getErrorMessage;
    private parseType;
    private isNumeric;
    private isStringArray;
}
export declare const Config: ConfigClass;
export {};
