import { IProjectFormCommonProps } from "~/types";
import { projectInfoFormSchema as schema } from "~/schemas";
import {
  Flex,
  PaddedFlexColumn,
  FormWrapper,
  FormTextInput,
  FormDateInput,
  FormAccordion,
} from "~/components/common";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { DEFAULT_PROJECT_DATE_FORMAT } from "~/constants";

export function ProjectInfoForm({
  lastResult,
  project,
  open,
  onAccordionClick,
  onCancelClick,
  intent,
  isLoading,
  isCancelPressed,
}: IProjectFormCommonProps) {
  const { t } = useTranslation();

  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`project-info-form-${open}-${isCancelPressed}`}
      shouldValidate="onSubmit"
      shouldRevalidate="onBlur"
      intent={intent}
    >
      {(form) => {
        const fields = form && form.getFieldset();
        return (
          <FormAccordion
            title={t("workspaceProjects.projectInfo")}
            desc={t("workspaceProjects.projectInfoSubtitle")}
            onAccordionClick={() => onAccordionClick(intent)}
            onCancelClick={onCancelClick}
            isLoading={isLoading}
            open={open}
            borderTop
          >
            <PaddedFlexColumn>
              <FormTextInput
                fieldName="name"
                defaultValue={project.name}
                label={t("workspaceProjects.projectName")}
                required
                name="name"
              />
              <Flex justifyContent="space-between" gap="50px">
                <FormDateInput
                  fieldName="dateStart"
                  label={t("workspaceProjects.startDate")}
                  containerProps={{ sx: { flex: 1 } }}
                  format={DEFAULT_PROJECT_DATE_FORMAT}
                  defaultValue={dayjs(project.dateStart)}
                  required
                />
                <FormDateInput
                  fieldName="dateEnd"
                  label={t("workspaceProjects.dueDate")}
                  containerProps={{ sx: { flex: 1 } }}
                  format={DEFAULT_PROJECT_DATE_FORMAT}
                  defaultValue={
                    project.dateEnd ? dayjs(project.dateEnd) : undefined
                  }
                  required={false}
                  minDate={
                    fields &&
                    dayjs(
                      fields.dateStart.value as string,
                      DEFAULT_PROJECT_DATE_FORMAT
                    ).add(1, "day")
                  }
                />
              </Flex>
            </PaddedFlexColumn>
          </FormAccordion>
        );
      }}
    </FormWrapper>
  );
}
