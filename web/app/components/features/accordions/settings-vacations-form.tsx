import { useTranslation } from "react-i18next";
import { IWorkspaceSettingsFormCommonProps } from "~/types";
import { vacationsFormSchema as schema } from "~/schemas";
import dayjs from "dayjs";
import {
  FormAccordion,
  FormDateInput,
  FormWrapper,
  PaddedFlexColumn,
} from "~/components/common";
import { formatDate } from "~/util";

export function SettingsVacationsForm({
  lastResult,
  workspace,
  open,
  onAccordionClick,
  onCancelClick,
  intent,
  isLoading,
  isCancelPressed,
}: IWorkspaceSettingsFormCommonProps) {
  const { t } = useTranslation();
  const description =
    formatDate(workspace.oldVacationExpiration, "MM-DD", "DD. MMMM") ??
    t("workspaceSettings.notSetYet");

  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`vacations-form-${open}-${isCancelPressed}`}
      shouldValidate="onSubmit"
      intent={intent}
    >
      <FormAccordion
        title={t("workspaceSettings.oldVacationExpirationDate")}
        desc={description}
        open={open}
        onAccordionClick={() => onAccordionClick(intent)}
        onCancelClick={onCancelClick}
        borderTop
        isLoading={isLoading}
      >
        <PaddedFlexColumn>
          <FormDateInput
            label={t("workspaceSettings.date")}
            fieldName="date"
            defaultValue={dayjs(workspace.oldVacationExpiration, "MM-DD")}
            required
            format="DD. MMMM"
          />
        </PaddedFlexColumn>
      </FormAccordion>
    </FormWrapper>
  );
}
