import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Theme, useTheme } from "@emotion/react";
import { Box, CircularProgress, SxProps, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { lazy } from "react";
import type { ApexOptions } from "apexcharts";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

const ApexChart = lazy(() => import("react-apexcharts"));

const Chart = styled(ApexChart)``;

export interface SalesProps {
  chartSeries: { name: string; data: number[] }[];
  sx?: SxProps<Theme>;
  isLoading?: boolean;
}

export function Graph({ chartSeries, sx, isLoading }: SalesProps) {
  const chartOptions = useChartOptions();
  const navigate = useNavigate();

  return (
    <Card sx={sx}>
      <CardContent>
        <Typography color="text.secondary" variant="overline">
          {t("dashboard.workingHours")}
        </Typography>
        <CardContent>
          {isLoading ? (
            <Box
              height={350}
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Chart
              height={350}
              options={chartOptions}
              series={chartSeries}
              type="bar"
              width="100%"
            />
          )}
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            color="inherit"
            endIcon={<ArrowRightOutlined style={{ color: "grey.400" }} />}
            size="small"
            onClick={() => navigate("/workspace-hub/reports")}
          >
            {t("workspaceReports.title")}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

function useChartOptions(): ApexOptions {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: { show: false },
    },
    colors: [
      theme.palette.primary.main,
      alpha(theme.palette.primary.main, 0.25),
    ],
    dataLabels: { enabled: false },
    fill: { opacity: 1, type: "solid" },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: false },
    plotOptions: { bar: { columnWidth: "40px" } },
    stroke: { colors: ["transparent"], show: true, width: 2 },
    theme: { mode: theme.palette.mode },
    xaxis: {
      axisBorder: { color: theme.palette.divider, show: true },
      axisTicks: { color: theme.palette.divider, show: true },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
  };
}
