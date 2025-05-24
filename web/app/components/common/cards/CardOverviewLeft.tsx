import {
  Flex,
  FlexColumn,
  Avatar,
  CenteredFlexColumn,
} from "~/components/common";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTablet } from "~/hooks";
import { ReactNode } from "react";
import { IImage } from "~/types";

interface IWorkspaceOverviewLeftProps {
  image: IImage;
  title: ReactNode;
  subtitle?: ReactNode;
  items: {
    key: string;
    value: ReactNode;
    icon: ReactNode;
  }[];
}

export function CardOverviewLeft({
  image,
  title,
  subtitle,
  items,
}: IWorkspaceOverviewLeftProps) {
  const isTablet = useTablet();
  return (
    <>
      {isTablet ? (
        <CenteredFlexColumn gap="10px">
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Avatar
              avatarId={image.id}
              src={image?.src}
              size={{ xs: "64px", sm: "128px" }}
              fontSize={{ xs: "24px", sm: "48px" }}
              name={
                image.secondInitialFullValue
                  ? `${image.firstInitialFullValue} ${image.secondInitialFullValue}`
                  : image.firstInitialFullValue
              }
            />
          </Box>
          <FlexColumn textAlign="center" gap="10px">
            <FlexColumn>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: (theme) => theme.typography.fontWeightRegular,
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "secondary",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {subtitle}
              </Typography>
            </FlexColumn>
            <FlexColumn gap="10px" alignItems="center">
              {items.map((item) => (
                <Flex gap="10px" alignItems="center" key={item.key}>
                  {item.icon}
                  <Typography variant="body1">{item.value}</Typography>
                </Flex>
              ))}
            </FlexColumn>
          </FlexColumn>
        </CenteredFlexColumn>
      ) : (
        <Flex gap="40px" alignItems="center" minWidth="fit-content">
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Avatar
              avatarId={image.id}
              src={image?.src}
              size="128px"
              fontSize="48px"
              name={
                image.secondInitialFullValue
                  ? `${image.firstInitialFullValue} ${image.secondInitialFullValue}`
                  : image.firstInitialFullValue
              }
            />
          </Box>
          <FlexColumn gap={subtitle ? "12px" : "42px"}>
            <FlexColumn>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: (theme) => theme.typography.fontWeightRegular,
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: (theme) => theme.palette.secondary.main,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {subtitle}
              </Typography>
            </FlexColumn>
            {items.map((item) => (
              <Flex gap="10px" alignItems="center" key={item.key}>
                {item.icon}
                <Typography variant="body1">{item.value}</Typography>
              </Flex>
            ))}
          </FlexColumn>
        </Flex>
      )}
    </>
  );
}
