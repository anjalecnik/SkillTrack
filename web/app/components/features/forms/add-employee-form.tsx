import { InfoCircleOutlined } from "@ant-design/icons";
import { FormId, getInputProps, useFormMetadata } from "@conform-to/react";
import { Typography, useTheme } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { Flex, FlexColumn, TextInput } from "~/components/common";

export interface IAddEmployeeFormProps {
  formId: FormId;
}

export function AddEmployeeForm({ formId }: IAddEmployeeFormProps) {
  const { t } = useTranslation();
  const form = useFormMetadata(formId);
  const theme = useTheme();

  const fields = form.getFieldset();

  return (
    <FlexColumn gap={"20px"} padding={"20px"}>
      <Flex justifyContent="space-between" gap={"50px"}>
        <TextInput
          {...getInputProps(fields.name, { type: "text" })}
          label={t("common.firstName")}
          containerProps={{ sx: { flex: 1 } }}
          placeholder={t("common.firstName")!}
          required
        />
        <TextInput
          {...getInputProps(fields.surname, { type: "text" })}
          label={t("common.lastName")}
          containerProps={{ sx: { flex: 1 } }}
          placeholder={t("common.lastName")!}
          required
        />
      </Flex>
      <TextInput
        {...getInputProps(fields.email, { type: "text" })}
        label={t("common.emailAddress")}
        required
        error={!!fields.email.errors}
        errorMessage={t(fields.email.errors?.[0] ?? "")}
        placeholder={t("common.emailAddress")!}
      />
      <Flex alignItems="center" gap="5px">
        <InfoCircleOutlined style={{ color: theme.palette.primary.main }} />
        <Typography variant="body1">
          <Trans i18nKey="workspaceEmployees.invitationSubtext" t={t} />
        </Typography>
      </Flex>
    </FlexColumn>
  );
}
