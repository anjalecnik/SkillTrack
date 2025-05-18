import { createContext } from "react";
import { FieldMetadata, FormMetadata } from "@conform-to/react";

export type FormFields = Required<{
  [x: string]: FieldMetadata<string, Record<string, string>, string[]>;
}>;
export interface IFormContext {
  form: FormMetadata<Record<string, string>, string[]> | undefined;
  groupRequire: Array<Array<string>> | undefined;
  fieldErrors: Record<string, string>;
  setFieldErrors: (errors: Record<string, string>) => void;
}

export const FormContext = createContext<IFormContext>({
  form: undefined,
  groupRequire: undefined,
  fieldErrors: {},
  setFieldErrors: () => {},
});
