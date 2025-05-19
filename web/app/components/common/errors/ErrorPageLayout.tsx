import { Button, styled, Typography } from "@mui/material";
import { Flex, FlexColumn } from "~/components/common";
import { t } from "i18next";
import { useNavigate, useParams } from "@remix-run/react";
import { useMobile, useTablet } from "~/hooks";
import { FEEDBACK_EMAIL_LIST } from "~/constants";

interface IErrorPageLayoutProps {
  title: string;
  subtitle: string;
  message: string;
  imgSrc?: string;
}

const Graphic = styled("img")`
  display: block;
  min-height: 200px;
  max-height: 100%;
  width: 600px;
  max-width: 100%;
  padding: 10px;

  @media screen and (min-width: 2560px) {
    width: 1000px;
  }

  @media screen and (max-height: 600px) {
    display: none;
  }
`;

const Title = styled(Typography)`
  font-family: Inter;
  font-size: 100px;
  font-weight: 700;
  color: #000000;

  @media screen and (max-width: 960px) {
    font-size: calc(100px - 3rem);
  }

  @media screen and (min-width: 1536px) {
    font-size: calc(100px + 0.5rem);
  }
`;

export function ErrorPageLayout({
  title,
  subtitle,
  message,
  imgSrc,
}: IErrorPageLayoutProps) {
  const isTablet = useTablet();
  const isMobile = useMobile();
  const navigate = useNavigate();

  const navigateUserToRightPage = () => {
    navigate("/");
  };

  return (
    <Flex
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      padding={isTablet ? "50px" : "100px"}
      gap={isTablet ? "0px" : "100px"}
      sx={{ flexDirection: isTablet ? "column" : "row" }}
    >
      <Graphic src={imgSrc} />
      <FlexColumn gap="70px" textAlign={isTablet ? "center" : undefined}>
        <FlexColumn gap="30px">
          <Title variant="h1" color="#262626">
            {title}
          </Title>
          <Typography
            variant={isTablet ? "h3" : "h1"}
            sx={{
              color: "#262626",
            }}
          >
            {subtitle}
          </Typography>
          <Typography
            variant={isTablet ? "h5" : "h3"}
            sx={{
              fontWeight: 400,
              color: "#262626",
            }}
          >
            {message}
          </Typography>
        </FlexColumn>
        <Flex
          gap="20px"
          sx={{
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Button
            variant="contained"
            sx={{ textAlign: "center" }}
            fullWidth={isTablet}
            onClick={navigateUserToRightPage}
          >
            {t("common.goToHomePage")}
          </Button>
          <Button
            href={`mailto:${FEEDBACK_EMAIL_LIST}?subject=Magnum - Problem`}
            variant="contained"
            sx={{ textAlign: "center" }}
            fullWidth={isTablet}
          >
            {t("common.reportIssue")}
          </Button>
        </Flex>
      </FlexColumn>
    </Flex>
  );
}
