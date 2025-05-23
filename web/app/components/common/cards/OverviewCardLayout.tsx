import { Card } from "@mui/material";
import {
  CardOverviewLeft,
  CardOverviewCenter,
  CardOverviewRight,
  Flex,
  FlexColumn,
} from "~/components/common";
import { useMobile } from "~/hooks";
import { ReactNode } from "react";
import { IImage } from "~/types";

interface IOverviewCardLayoutProps {
  title: ReactNode;
  subtitle?: ReactNode;
  image: IImage;
  footerChildren?: ReactNode;
  leftItems: {
    key: string;
    value: ReactNode;
    icon: ReactNode;
  }[];
  rightItems: {
    key: string;
    value: ReactNode;
    icon: ReactNode;
  }[];
}

export function OverviewCardLayout({
  title,
  subtitle,
  image,
  footerChildren,
  leftItems,
  rightItems,
}: IOverviewCardLayoutProps) {
  const isMobile = useMobile();

  return (
    <Card
      sx={{
        backgroundColor: "#ffffff",
        border: "1px solid #F0F0F0",
        padding: "40px 40px 20px 40px",
        display: "flex",
        flexDirection: "column",
        ...(isMobile && { padding: "20px 15px 20px 15px" }),
      }}
    >
      <FlexColumn gap="20px">
        <Flex
          gap="20px"
          justifyContent="space-between"
          overflow="auto"
          sx={{
            ...(isMobile && {
              textAlign: "left",
              flexDirection: "column",
              gap: "15px",
            }),
          }}
        >
          <CardOverviewLeft
            subtitle={subtitle}
            title={title}
            image={image}
            items={leftItems}
          />
          <CardOverviewRight items={rightItems} />
        </Flex>
        {footerChildren}
      </FlexColumn>
    </Card>
  );
}
