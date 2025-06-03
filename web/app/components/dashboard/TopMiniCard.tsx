import { DownOutlined, UpOutlined } from "@ant-design/icons";
import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import { ReactNode } from "react";

export interface TopMiniCardProps {
  title: string;
  icon: ReactNode;
  diff?: number;
  trend: "up" | "down";
  sx?: SxProps<Theme>;
  value: number;
  isLoading: boolean;
}

export function TopMiniCard({
  title,
  icon,
  diff,
  trend,
  sx,
  value,
  isLoading,
}: TopMiniCardProps) {
  const trendColor = trend === "up" ? "#52c41a" : "#ff4d4f";

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {t(title)}
              </Typography>
              {isLoading ? (
                <CircularProgress size={28} />
              ) : (
                <Typography variant="h4">{value}</Typography>
              )}
            </Stack>
            <Avatar
              sx={{
                height: 56,
                width: 56,
                bgcolor: "transparent",
                color: "grey.400",
                border: "1px solid",
                borderColor: "grey.300",
              }}
              variant="circular"
            >
              {icon}
            </Avatar>
          </Stack>
          {diff ? (
            <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
              <Stack
                sx={{ alignItems: "center" }}
                direction="row"
                spacing={0.5}
              >
                {trend === "up" ? (
                  <UpOutlined style={{ color: trendColor }} />
                ) : (
                  <DownOutlined style={{ color: trendColor }} />
                )}
                <Typography color={trendColor} variant="body2">
                  {diff}%
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="caption">
                {t("dashboard.sinceLastMonth")}
              </Typography>
            </Stack>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
