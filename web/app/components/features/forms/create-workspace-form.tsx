import { Form, useNavigate } from "@remix-run/react";
import {
  Button,
  Flex,
  FlexColumn,
  IconButton,
  Link,
  TextInput,
} from "~/components/common";
import { Checkbox, FormControlLabel, styled, Typography } from "@mui/material";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { Trans } from "react-i18next";
import { useState } from "react";
import { useTablet, useMobile } from "~/hooks";

const WorkspaceTextInput = styled(TextInput)`
  border-radius: 2px;
  min-width: 100%;
`;

export function CreateWorkspaceForm() {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const isTablet = useTablet();
  const isMobile = useMobile();
  const navigate = useNavigate();

  return (
    <Form method="post">
      <FlexColumn gap="10px">
        <FlexColumn gap="5px">
          <Typography
            variant="subtitle1"
            fontWeight="400"
            sx={{
              color: (theme) => theme.palette.grey[900],
            }}
          >
            {t("common.workspace")}
          </Typography>

          <Flex justifyContent="space-between" gap="20px">
            <WorkspaceTextInput
              name="createWorkspaceInpt"
              data-testid="workspaceNameInput"
              value={value}
              placeholder={t("common.workspaceInputPlaceholder")}
              fullWidth
              onChange={(value) => setValue(value)}
            />

            {!isMobile ? (
              <Button
                name="createWorkspaceBtn"
                variant="contained"
                type="submit"
                data-testid="createWorkspaceSubmitBtn"
                disabled={!checked || value === ""}
              >
                {t("common.createButton")}
              </Button>
            ) : null}
          </Flex>
        </FlexColumn>

        <FlexColumn gap="10px">
          <Flex
            justifyContent="space-between"
            sx={{
              flexDirection: "column",
              gap: { xs: "20px" },
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  data-testid="cookieAgreeButton"
                  onClick={() => setChecked((checked) => !checked)}
                />
              }
              label={
                <Typography>
                  <Trans
                    i18nKey={
                      isTablet
                        ? "common.privacyPolicyTablet"
                        : "common.privacyPolicy"
                    }
                    t={t}
                    components={{
                      privacyPolicyLinkComponent: <Link to="" />,
                      cookiePolicyLinkComponent: <Link to="" />,
                    }}
                  />
                </Typography>
              }
              labelPlacement="end"
              sx={{ ml: "1px" }}
            />
          </Flex>
        </FlexColumn>

        <Typography variant="body1">
          <Trans
            i18nKey={
              isTablet ? "common.languageSetupTablet" : "common.languageSetup"
            }
            t={t}
            components={{ countryLinkTag: <Link to="" /> }}
          />
        </Typography>

        {isMobile ? (
          <Button
            name="createWorkspaceBtn"
            variant="contained"
            type="submit"
            data-testid="createWorkspaceSubmitBtn"
            disabled={!checked || value === ""}
          >
            {t("common.createButton")}
          </Button>
        ) : null}

        <IconButton
          onClick={() => navigate(`/logout`)}
          size="medium"
          type="button"
          sx={{
            justifyContent: "left",
            width: "fit-content",
            padding: 0,
            height: "unset",
            fontSize: "14px",
          }}
        >
          <Flex gap="8px">
            <ArrowLeftOutlined />
            {t("common.backToHome")}
          </Flex>
        </IconButton>
      </FlexColumn>
    </Form>
  );
}
