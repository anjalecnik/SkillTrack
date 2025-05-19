import { useContext, useEffect, useState } from "react";
import { FormContext, hasAnyRequiredValues } from "~/util";

export function useIsFieldRequired(fieldName: string) {
  const { form, groupRequire } = useContext(FormContext);
  const [required, setRequired] = useState(false);

  useEffect(() => {
    if (!groupRequire || !form || !form.value) return;
    const group = groupRequire.find((group) => {
      return group.includes(fieldName);
    });
    group && setRequired(hasAnyRequiredValues(form.value, group));
  }, [form, setRequired, fieldName, groupRequire]);

  return required;
}
