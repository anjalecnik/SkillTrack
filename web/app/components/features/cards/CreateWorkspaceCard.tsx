import { styled, Typography } from "@mui/material";
import { FlexColumn } from "~/components/common";
import { CardLayout } from "~/components/layout";
import { t } from "i18next";
import { CreateWorkspaceForm } from "~/components/features";
import { CreateWorkspaceGraphic } from "~/assets/";
import { useMobile } from "~/hooks";

const Graphic = styled("img")`
  display: block;
  width: auto;
  min-height: 0px;
  margin: 48px 20px 15px 20px;

  @media only screen and (min-width: 600px) {
    width: 40%;
  }

  @media only screen and (min-width: 1000px) {
    width: 600px;
  }
`;

const Title = styled(Typography)`
  font-family: Inter;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 10px;
  text-align: center;

  font-family: "Public Sans";

  @media only screen and (min-width: 600px) {
    text-align: revert;
    font-size: revert;
  }

  @media only screen and (min-width: 1536px) {
    font-size: calc(50px + 0, 3rem);
  }
`;

const Subtitle = styled(Typography)`
  font-size: 1.5rem;
  text-align: center;

  @media only screen and (min-width: 600px) {
    font-size: revert;
    text-align: revert;
  }
`;

const Layout = styled(CardLayout)`
  width: 100%;
  gap: 100px;
  min-height: 55vh;
  max-width: 100%;
  margin: 0;
  flex-direction: column-reverse;

  @media only screen and (min-width: 450px) {
    gap: 6px;
    margin: 40px;
    text-align: unset;
    min-height: 30vh;
    width: auto;
  }

  @media only screen and (min-width: 600px) {
    flex-direction: row;
    max-width: 80%;
    max-width: 1000px;
  }
`;

export function CreateWorkspaceCard() {
  const isMobile = useMobile();

  return (
    <Layout
      sx={{
        display: "flex",
        padding: "30px",
        bgcolor: (theme) =>
          isMobile ? theme.palette.grey[50] : theme.palette.grey[0],
        border: "none",
      }}
    >
      <FlexColumn
        justifyContent="space-between"
        gap={isMobile ? "100px" : "50px"}
      >
        <FlexColumn gap="5px">
          <Title
            variant="h1"
            sx={{ color: (theme) => theme.palette.grey[900] }}
          >
            {t("common.title")}
          </Title>
          <Subtitle
            variant="h2"
            sx={{
              fontWeight: "500",
              color: (theme) => theme.palette.grey[900],
            }}
          >
            {t("common.workspaceCreationFirstPart")}
          </Subtitle>
          <Subtitle
            variant="h2"
            sx={{
              fontWeight: "700",
              color: (theme) => theme.palette.grey[900],
            }}
          >
            {t("common.workspaceCreationSecondPart")}
          </Subtitle>
        </FlexColumn>
        <CreateWorkspaceForm />
      </FlexColumn>
      <Graphic src={CreateWorkspaceGraphic} />
    </Layout>
  );
}
