import { CenteredFlexColumn, FlexColumn } from "~/components/common";
import { Box, Divider, Tooltip, Typography } from "@mui/material";
import { useTablet } from "~/hooks";
import { ReactNode } from "react";

interface IWorkspaceOverviewItems {
  key: string;
  label: ReactNode;
  value: ReactNode;
  tooltip?: ReactNode;
}
interface IWorkspaceOverviewCenterProps {
  items: IWorkspaceOverviewItems[];
}

export function CardOverviewCenter({ items }: IWorkspaceOverviewCenterProps) {
  const isTablet = useTablet();

  return (
    <>
      {isTablet ? (
        <CenteredFlexColumn gap="10px">
          {items.map((item) => (
            <Tooltip key={item.key} title={item.tooltip} placement="top">
              <FlexColumn alignItems="center" textAlign="center">
                <Typography
                  variant="body1"
                  sx={{
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  {item.label}
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: (theme) => theme.typography.fontWeightMedium,
                  }}
                >
                  {item.value}
                </Typography>
              </FlexColumn>
            </Tooltip>
          ))}
        </CenteredFlexColumn>
      ) : (
        <>
          <Divider orientation="vertical" flexItem />
          <Box
            sx={(theme) => ({
              display: "grid",
              columnGap: "50px",
              rowGap: "25px",
              alignItems: "center",
              gridTemplateColumns:
                items.length < 3 ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              [theme.breakpoints.down(1140)]: {
                gridTemplateColumns: "repeat(2, 1fr)",
              },
            })}
          >
            {items.map((item) => (
              <Tooltip key={item.key} title={item.tooltip} placement="top">
                <CenteredFlexColumn textAlign="center">
                  <Typography
                    variant="body1"
                    sx={{
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    {item.label}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: (theme) => theme.typography.fontWeightMedium,
                    }}
                  >
                    {item.value}
                  </Typography>
                </CenteredFlexColumn>
              </Tooltip>
            ))}
          </Box>
        </>
      )}
    </>
  );
}
