import { WithRequired } from "../types/interfaces";
export declare abstract class TypeHelper {
    static validateRelation<T, K extends keyof T>(entity: T, key: K): WithRequired<T, K>;
}
