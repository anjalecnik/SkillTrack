import { Transform } from "class-transformer"

export const ParseParamArray = () => Transform(({ value }) => (Array.isArray(value) ? (value as unknown[]) : [value as unknown]))
