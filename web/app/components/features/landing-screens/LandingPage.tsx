import { styled, Typography } from "@mui/material";
import { Button, Flex, FlexColumn } from "~/components/common";
import { t } from "i18next";
import { LandingGraphic } from "~/assets";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { Trans } from "react-i18next";
import { AuthClient } from "~/clients";
import { CardLayout } from "~/components/layout";
import { useMobile } from "~/hooks";

const Graphic = styled("img")`
  display: block;
  min-height: 200px;
  max-height: 100%;
  width: 70%;
  max-width: 100%;

  @media screen and (min-width: 600px) {
    width: 80%;
  }

  @media screen and (min-width: 7000px) {
    width: 400px;
  }
`;

const Title = styled(Typography)`
  font-family: Inter;
  font-size: 50px;
  font-weight: 700;
  line-height: 1.3;
  align-items: center;

  @media screen and (max-width: 600px) {
    font-size: calc(50px - 0.2rem);
    align-items: start;
  }

  @media screen and (min-width: 1536px) {
    font-size: calc(50px + 0.5rem);
  }
`;

const Layout = styled(CardLayout)`
  min-height: 55vh;

  @media only screen and (min-width: 450px) {
    min-height: 30vh;
  }
`;

export function LandingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useMobile();

  async function handleGoogleSignIn(redirect: string) {
    console.log("[handleGoogleSignIn] Initiating Google sign-in...");
    const token = await AuthClient.signInWithGoogleProvider();
    console.log("[handleGoogleSignIn] Token received:", token);

    if (!token) {
      console.error("[handleGoogleSignIn] No token received. Aborting.");
      return;
    }

    try {
      await AuthClient.signInWithGoogle(token);
      console.log("[handleGoogleSignIn] Sign-in with backend successful.");
    } catch (err) {
      console.error("[handleGoogleSignIn] Error signing in with backend:", err);
    }

    navigate("/user-hub/dashboard");
  }

  return (
    <FlexColumn width="100vw" height="100vh" justifyContent="center">
      <Layout
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          justifyContent: "center",
          padding: isMobile ? "0 40px" : "40px",
          margin: isMobile ? "0" : "40px",
          gap: "20px",
          border: "none",
          bgcolor: (theme) =>
            isMobile ? theme.palette.grey[50] : theme.palette.grey[0],
        }}
      >
        <Flex
          justifyContent="space-between"
          gap={isMobile ? "50px" : "10px"}
          direction={isMobile ? "column-reverse" : undefined}
        >
          <FlexColumn
            justifyContent="space-between"
            alignItems={isMobile ? "center" : "start"}
            gap="100px"
            minWidth="260px"
          >
            <FlexColumn gap="30px" alignItems={isMobile ? "center" : "start"}>
              <FlexColumn gap="5px">
                <Title
                  variant="h1"
                  data-testid="landingTitle"
                  sx={{
                    color: (theme) => theme.palette.grey[900],
                    fontSize: { xs: "xxx-large", sm: "25px", md: "xxx-large" },
                  }}
                >
                  {t("common.title")}
                </Title>
              </FlexColumn>

              <Typography
                variant="h3"
                fontWeight={500}
                fontSize={{ xs: null, sm: "16px", md: "24px" }}
                textAlign={{ xs: "center", sm: "start" }}
                sx={{
                  color: (theme) => theme.palette.grey[900],
                }}
              >
                <Trans i18nKey="common.landingSubtitle" t={t} />
              </Typography>
            </FlexColumn>

            <FlexColumn
              gap="10px"
              width="100%"
              alignItems={isMobile ? "center" : "start"}
            >
              <Typography variant="body1">
                {t("common.startProjects")}
              </Typography>
              <Flex
                gap="20px"
                alignItems="center"
                width="100%"
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Button
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                  }}
                  data-testid="signInBtn"
                  variant="outlined"
                  name="redirectTo"
                  value="selectWorkspace"
                  type="submit"
                  onClick={() => handleGoogleSignIn("selectWorkspace")}
                >
                  <Typography variant="body1">{t("common.signIn")}</Typography>
                </Button>
              </Flex>
            </FlexColumn>
          </FlexColumn>
          <Flex justifyContent={isMobile ? "center" : "end"}>
            <Graphic src={LandingGraphic} />
          </Flex>
        </Flex>
      </Layout>
    </FlexColumn>
  );
}
