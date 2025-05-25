import { FormId, getInputProps, useFormMetadata } from "@conform-to/react";
import { useTranslation } from "react-i18next";
import { FlexColumn, TextInput } from "~/components/common";

interface IAddProjectFormProps {
  formId: FormId;
}

export function AddProjectForm({ formId }: IAddProjectFormProps) {
  const { t } = useTranslation();
  const form = useFormMetadata(formId);

  const fields = form.getFieldset();

  return (
    <FlexColumn gap={"20px"} padding={"20px"}>
      <TextInput
        {...getInputProps(fields.name, { type: "text" })}
        key={fields.name.key}
        dataTestId="projectInput"
        label={t("workspaceProjects.project")}
        required
        placeholder={t("workspaceProjects.projectPlaceholder")!}
      />
    </FlexColumn>
  );
}
