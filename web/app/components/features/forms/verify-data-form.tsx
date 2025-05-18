import { Form } from "@remix-run/react";
import {
  Avatar,
  Button,
  CenteredFlexColumn,
  Link,
  TextInput,
} from "~/components/common";
import { Typography } from "@mui/material";
import { t } from "i18next";
import { Trans } from "react-i18next";
import { LocalStorageService } from "~/util";
import { IProvidedUser } from "~/types";
import { FormProvider, useForm } from "@conform-to/react";

interface IVerifyDataFormProps {
  userData: {
    workspaceUserName: string;
    workspaceUserSurname: string;
  };
}

export function VerifyDataForm({ userData }: IVerifyDataFormProps) {
  const [form] = useForm({
    id: "verify-data-form",
  });

  return (
    <Form method="post" replace id={form.id}>
      <FormProvider context={form.context}>
        <CenteredFlexColumn
          padding="40px"
          gap="30px"
          border="1px solid #F0F0F0"
          borderRadius="4px"
          boxShadow="0px 8px 25px 0px #0000000D"
        >
          <Typography variant="h4">{t("common.verifyData")}</Typography>
          <Avatar
            size="64px"
            src={LocalStorageService.get<IProvidedUser>("user")?.picture ?? ""}
          />
          <TextInput
            label={t("common.emailAddress")}
            name="email"
            disabled
            containerProps={{ width: "100%" }}
            value={LocalStorageService.get<IProvidedUser>("user")?.email ?? ""}
          />
          <TextInput
            label={t("common.firstName")}
            required
            name="name"
            data-testid="workspaceUserNameInput"
            disabled={!!userData?.workspaceUserName}
            value={userData?.workspaceUserName}
            containerProps={{ width: "100%" }}
          />
          <TextInput
            label={t("common.lastName")}
            required
            name="surname"
            data-testid="workspaceUserSurnameInput"
            disabled={!!userData?.workspaceUserName}
            value={userData?.workspaceUserSurname}
            containerProps={{ width: "100%" }}
          />
          <Button
            variant="contained"
            name="continue"
            type="submit"
            fullWidth
            data-testid="createWorkspaceContinueBtn"
          >
            {t("common.continue")}
          </Button>
          <Typography variant="body2">
            <Trans
              i18nKey="common.privacyPolicy"
              t={t}
              components={{
                privacyPolicyLinkComponent: <Link to="" />,
                cookiePolicyLinkComponent: <Link to="" />,
              }}
            />
          </Typography>
        </CenteredFlexColumn>
      </FormProvider>
    </Form>
  );
}
