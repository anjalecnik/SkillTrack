import { DefaultValues } from "src/utils/config/classes/config.default-values.class";
type ConfigKey = keyof DefaultValues;
export declare class AppConfigService {
    get<T extends string | number | boolean | string[]>(key: ConfigKey): T;
}
export {};
