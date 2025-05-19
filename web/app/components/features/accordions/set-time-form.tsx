import { Trans, useTranslation } from "react-i18next";
import { IWorkspaceSettingsFormCommonProps } from "~/types";
import { setTimeFormSchema as schema } from "~/schemas";
import {
  Flex,
  FormWrapper,
  FormTimeSelect,
  FormAccordion,
} from "~/components/common";
import { Typography } from "@mui/material";
import dayjs from "dayjs";

export function SetTimeForm({
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
  const description = `${t("workspaceSettings.daily")}, ${
    workspace?.dailyReportTime
      ? workspace.dailyReportTime
      : t("workspaceSettings.notSetYet")
  }`;

  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`set-time-form-${open}-${isCancelPressed}`}
      shouldValidate="onBlur"
      intent={intent}
    >
      <FormAccordion
        title={t("workspaceSettings.setTime")}
        desc={description}
        open={open}
        onCancelClick={onCancelClick}
        onAccordionClick={() => onAccordionClick(intent)}
        borderTop
        isLoading={isLoading}
      >
        <Flex gap="40px" padding="20px" alignItems="center">
          <Typography
            variant="body1"
            sx={{
              marginTop: "25px",
            }}
          >
            <Trans i18nKey="workspaceSettings.frequencyDaily" t={t} />
          </Typography>
          <FormTimeSelect
            fieldName="time"
            defaultValue={dayjs(workspace.dailyReportTime, "HH:mm")}
            label={t("workspaceSettings.at")}
            ampm={false}
            format="HH:mm"
          />
        </Flex>
      </FormAccordion>
    </FormWrapper>
  );
}
