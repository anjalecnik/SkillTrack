import {
  FormMetadata,
  FormProvider,
  SubmissionResult,
  useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form } from "@remix-run/react";
import { ReactElement, useState } from "react";
import { ZodSchema } from "zod";
import { FormContext, getDefaultFormInputValues } from "~/util";

interface IFormWrapperProps<T extends ZodSchema> {
  lastResult?: SubmissionResult<string[]> | null;
  children: ReactElement | ((form: FormMetadata | undefined) => ReactElement);
  schema: T;
  shouldValidate?: "onSubmit" | "onBlur" | "onInput";
  shouldRevalidate?: "onSubmit" | "onBlur" | "onInput";
  intent: string;
  id: string;
  groupRequire?: Array<Array<string>>;
  shouldDirtyConsider?: (name: string) => boolean;
}

export function FormWrapper<T extends ZodSchema>({
  id,
  lastResult,
  schema,
  shouldRevalidate,
  shouldValidate,
  intent,
  children,
  groupRequire,
}: IFormWrapperProps<T>) {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const evaluatedChildren =
    typeof children === "function" ? children(null) : children;

  const defaultValues: Record<string, string | string[]> = {
    intent: intent,
    ...getDefaultFormInputValues(evaluatedChildren),
  };

  const [form] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    defaultValue: defaultValues,
    shouldValidate,
    shouldRevalidate,
    id,
  });

  return (
    <FormContext.Provider
      value={{ form, groupRequire, fieldErrors, setFieldErrors }}
    >
      <FormProvider context={form.context}>
        <Form method="post" id={form.id} onSubmit={form.onSubmit}>
          <input type="hidden" name="intent" value={intent} />
          {typeof children === "function" ? children(form) : children}
        </Form>
      </FormProvider>
    </FormContext.Provider>
  );
}
