import {
  CenteredFlexColumn,
  Flex,
  FlexColumn,
  MiniButton,
} from "~/components/common";
import {
  Card,
  Divider,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { IWorkspaceOverview } from "~/types";
import { useMobile } from "~/hooks";
import { MailOutlined } from "@ant-design/icons";
export interface IWorkspaceCardProps {
  workspace: IWorkspaceOverview;
  onClick: () => void;
}

export function WorkspaceCard({ workspace, onClick }: IWorkspaceCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMobile();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const Graphic = styled("img")`
    max-width: 128px;
    min-width: 128px;

    @media (max-width: ${theme.breakpoints.values.sm}px) {
      max-width: 64px;
      min-width: 64px;
    }
  `;

  const getWorkspaceJoinButton = (workspace: IWorkspaceOverview) => {
    const { workspaceUserRole, isInvited } = workspace;
    if (workspaceUserRole) {
      return t("common.signIn");
    } else if (isInvited) {
      return t("common.acceptInvite");
    }
    return t("common.join");
  };

  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        border: "1px solid #F0F0F0",
        padding: isTablet ? "15px" : "40px 40px 20px 40px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Flex
        gap={isTablet ? "15px" : "40px"}
        justifyContent={isTablet ? "start" : "space-between"}
        overflow="auto"
        direction={isTablet ? "column" : "row"}
        alignItems="center"
      >
        <Flex
          gap={isTablet ? "15px" : "40px"}
          alignItems="center"
          direction={isMobile ? "column" : "row"}
          width={isTablet ? "auto" : "100%"}
        >
          <FlexColumn gap={isTablet ? "15px" : "42px"}>
            <Typography
              variant={isTablet ? "h3" : "h2"}
              fontWeight={(theme) => theme.typography.fontWeightRegular}
              alignSelf={isMobile ? "center" : "start"}
            >
              {workspace.name}
            </Typography>
            <Flex
              gap="10px"
              alignItems="center"
              alignSelf={isMobile ? "center" : "start"}
            >
              <MailOutlined />
              <Typography variant="body1">{workspace.email}</Typography>
            </Flex>
          </FlexColumn>
        </Flex>
        <Divider orientation={isTablet ? "horizontal" : "vertical"} flexItem />
        <Flex gap="40px" minHeight="100%">
          <CenteredFlexColumn>
            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              {t("common.employees")}
            </Typography>

            <Typography
              variant="subtitle1"
              fontWeight={(theme) => theme.typography.fontWeightMedium}
            >
              {workspace.workspaceUsersCount}
            </Typography>
          </CenteredFlexColumn>
          <CenteredFlexColumn>
            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              {t("common.projects")}
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={(theme) => theme.typography.fontWeightMedium}
            >
              {workspace.projectsCount}
            </Typography>
          </CenteredFlexColumn>
        </Flex>
      </Flex>
      <MiniButton
        variant="outlined"
        size="small"
        fullWidth={isTablet}
        onClick={onClick}
        data-testid="signInWorkpaceButton"
        sx={{
          marginTop: "15px",
          color: (theme) => theme.palette.info.main,
          borderColor: (theme) => theme.palette.info.main,
          maxWidth: isMobile ? "100%" : "200px",
          alignSelf: isTablet ? "center" : "end",
        }}
      >
        {getWorkspaceJoinButton(workspace)}
      </MiniButton>
    </Card>
  );
}
