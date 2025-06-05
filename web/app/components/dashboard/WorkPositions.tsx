import { lazy, ReactNode } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import type { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { ApexOptions } from "apexcharts";
import {
  BranchesOutlined,
  CloudServerOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import { t } from "i18next";
import { CircularProgress } from "@mui/material";

const ApexChart = lazy(() => import("react-apexcharts"));

const Chart = styled(ApexChart)``;

const iconMapping = {
  Other: <BranchesOutlined style={{ fontSize: "1.5rem" }} />,
  "Cloud Infrastructure Engineer": (
    <CloudServerOutlined style={{ fontSize: "1.5rem" }} />
  ),
  "Database Reliability Engineer": (
    <ConsoleSqlOutlined style={{ fontSize: "1.5rem" }} />
  ),
} as Record<string, ReactNode>;

export interface WorkPositionsProps {
  chartSeries: number[];
  labels: string[];
  total: number;
  sx?: SxProps;
  isLoading: boolean;
}

export function WorkPositions({
  chartSeries,
  labels,
  total,
  sx,
  isLoading,
}: WorkPositionsProps): React.JSX.Element {
  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardContent>
        <Typography color="text.secondary" variant="overline">
          {t("dashboard.positionsStats")}
        </Typography>
        <CardContent>
          {isLoading ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              height="400px"
              width="100%"
            >
              <CircularProgress size={32} />
            </Stack>
          ) : (
            <Stack spacing={2}>
              <Chart
                height={300}
                options={chartOptions}
                series={chartSeries}
                type="donut"
                width="100%"
              />
              <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                {chartSeries.map((item, index) => {
                  const label = labels[index];
                  const Icon = iconMapping[label];

                  return (
                    <Stack
                      key={label}
                      spacing={1}
                      sx={{ alignItems: "center" }}
                    >
                      {Icon ?? null}
                      <Typography variant="h5">
                        {label.split(" ")[0]}
                      </Typography>
                      <Typography color="text.secondary" variant="subtitle1">
                        {((item / total) * 100).toFixed(2)}%
                      </Typography>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          )}
        </CardContent>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: "transparent" },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
    ],
    dataLabels: { enabled: false },
    labels,
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    states: {
      active: { filter: { type: "none" } },
      hover: { filter: { type: "none" } },
    },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}
