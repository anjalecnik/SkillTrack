import { ArrowRightOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Chip, useTheme } from "@mui/material";
import { t } from "i18next";
import { Flex } from "~/components/common";

const ChipConnector = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        width: "50px",
        height: "2px",
        backgroundColor: theme.palette.primary.main,
      }}
    />
  );
};

export function StatusFlowBody() {
  const theme = useTheme();

  return (
    <>
      <Flex alignItems="center" marginTop="20px">
        <Chip
          icon={<ArrowRightOutlined />}
          label={t("workspaceEmployees.invitationSent")}
          variant="outlined"
        />
        <ChipConnector />
        <Chip
          label={t("workspaceEmployees.invitationPending")}
          variant="outlined"
          color="primary"
        />
        <ChipConnector />
        <Chip
          label={t("workspaceEmployees.active")}
          variant="outlined"
          color="success"
        />
        <ChipConnector />
        <Chip
          label={t("workspaceEmployees.deactivated")}
          variant="outlined"
          color="error"
        />
      </Flex>
      <Flex alignItems="center" gap="5px" marginTop="50px">
        <InfoCircleOutlined
          style={{
            color: theme.palette.primary.main,
            fontSize: "18px",
          }}
        />
        {t("workspaceEmployees.statusFlowSubtitle")}
      </Flex>
    </>
  );
}
