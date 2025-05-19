import { styled, Typography } from "@mui/material";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Trans } from "react-i18next";
import { IconButton, Flex, FlexColumn } from "~/components/common";
import { CardLayout } from "~/components/layout";
import { t } from "i18next";
import { WorkspaceCard } from "~/components/features";
import { useNavigate } from "@remix-run/react";
import { IWorkspaceOverview, UserRoles } from "~/types";
import { USER_HUB_PATH, WORKSPACE_HUB_PATH } from "~/constants";
import { buildUrlWithParams } from "~/util";
import { useMobile } from "~/hooks";

const Title = styled(Typography)`
  font-family: Inter;
  font-size: 50px;
  font-weight: 700;
  line-height: 1.3;

  @media screen and (min-width: 1536px) {
    font-size: calc(50px + 0.5rem);
  }
`;

interface ISelectWorkspaceCardProps {
  workspaces: IWorkspaceOverview[];
}

export function SelectWorkspaceCard({ workspaces }: ISelectWorkspaceCardProps) {
  const navigate = useNavigate();
  const isMobile = useMobile();

  const navigateToWorkspace = (workspace: IWorkspaceOverview) => {
    const { id, workspaceUserRole, userJoinData } = workspace;

    if (
      workspaceUserRole === UserRoles.Owner ||
      workspaceUserRole === UserRoles.Admin
    ) {
      return `${WORKSPACE_HUB_PATH}/${id}/settings`;
    }
    if (workspaceUserRole === UserRoles.User) {
      return `${USER_HUB_PATH}/${id}`;
    }
    const queryParams =
      userJoinData.name && userJoinData.surname
        ? {
            workspaceUserName: userJoinData.name,
            workspaceUserSurname: userJoinData.surname,
          }
        : {};

    return buildUrlWithParams("/auth/verify-data", queryParams);
  };

  return (
    <CardLayout
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "1000px",
        width: "100%",
        padding: "40px",
        gap: "20px",
        bgcolor: "transparent",
        border: "none",
        margin: "3vh auto",
      }}
    >
      <Title
        variant="h1"
        sx={{
          color: (theme) => theme.palette.grey[900],
          textAlign: "left",
        }}
        data-testid="select-workspace-title"
      >
        {t("common.title")}
      </Title>

      <Typography
        variant="h4"
        fontWeight={(theme) => theme.typography.fontWeightRegular}
        fontSize="24px"
        textAlign="left"
        sx={{
          color: (theme) => theme.palette.grey[900],
        }}
      >
        <Trans i18nKey="common.selectWorkspaceSubtitle" t={t} />
      </Typography>

      <FlexColumn gap="10px" marginBottom={isMobile ? "0" : "30px"}>
        {/* TODO: uncomment when we will have help section implemented.
        <Typography variant="h6" textAlign="left">
          <Trans
            i18nKey="common.selectWorkspaceNeedHelp"
            t={t}
            components={{
              needHelpLink: <Link to="" />,
            }}
          />
        </Typography> */}

        <IconButton
          onClick={() => navigate(`/logout`)}
          size="medium"
          type="button"
          sx={{
            justifyContent: "left",
            width: "fit-content",
            padding: 0,
          }}
        >
          <Flex gap="8px">
            <ArrowLeftOutlined />
            {t("common.backToHome")}
          </Flex>
        </IconButton>
      </FlexColumn>

      <Flex
        justifyContent="space-between"
        alignItems="start"
        direction={isMobile ? "column" : "row"}
        gap="20px"
      >
        <Typography
          variant={isMobile ? "h2" : "h1"}
          sx={{
            color: (theme) => theme.palette.grey[900],
          }}
        >
          {t("common.yourWorkspaces")}
        </Typography>
        {/* TODO: uncomment when create new workspace is visible based on logged in user role
        <Flex
          justifyContent="end"
          gap="20px"
          flexDirection={isMobile ? "column" : "row"}
        >
          <Button
            onClick={() => {
              navigate(`/auth/create-workspace`);
            }}
            variant="contained"
          >
            {t("common.createNewWorkspace")}
          </Button>
        </Flex> */}
      </Flex>

      {!workspaces.length && (
        <Typography
          variant="subtitle1"
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {t("error.noWorkspaceMessage")}
        </Typography>
      )}

      {workspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace.id}
          workspace={workspace}
          onClick={() => navigate(navigateToWorkspace(workspace))}
        />
      ))}
    </CardLayout>
  );
}
