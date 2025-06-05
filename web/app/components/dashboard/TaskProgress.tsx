import { UnorderedListOutlined } from "@ant-design/icons";
import { CircularProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { t } from "i18next";

export interface TasksProgressProps {
  sx?: SxProps;
  value: number;
  isLoading: boolean;
}

export function TasksProgress({ value, sx, isLoading }: TasksProgressProps) {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography
                color="text.secondary"
                gutterBottom
                variant="overline"
              >
                {t("dashboard.taskProgress")}
              </Typography>
              {isLoading ? (
                <CircularProgress size={28} />
              ) : (
                <Typography variant="h4">{value}%</Typography>
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
              <UnorderedListOutlined />
            </Avatar>
          </Stack>
          <div>
            <LinearProgress value={value} variant="determinate" />
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
