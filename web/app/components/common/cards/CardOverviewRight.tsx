import { Flex, FlexColumn } from "~/components/common";
import { Divider, Typography } from "@mui/material";
import { useTablet } from "~/hooks";
import { ReactNode } from "react";

interface IWorkspaceOverviewRightProps {
  items: {
    key: string;
    value: ReactNode;
    icon: ReactNode;
  }[];
}

export function CardOverviewRight({ items }: IWorkspaceOverviewRightProps) {
  const isTablet = useTablet();
  return (
    <>
      {isTablet ? (
        <FlexColumn
          textAlign="center"
          gap="10px"
          justifyContent="center"
          alignItems="center"
          key="key"
        >
          {items.map((item) => (
            <Flex gap="10px" key={item.key}>
              {item.icon}
              <Typography sx={{ wordBreak: "keep-all" }}>
                {item.value}
              </Typography>
            </Flex>
          ))}
        </FlexColumn>
      ) : (
        <>
          <Divider orientation="vertical" flexItem />
          <FlexColumn gap="20px" justifyContent="center" key="key">
            {items.map((item) => (
              <Flex gap="10px" key={item.key}>
                {item.icon}
                <Typography sx={{ wordBreak: "keep-all" }}>
                  {item.value}
                </Typography>
              </Flex>
            ))}
          </FlexColumn>
        </>
      )}
    </>
  );
}
