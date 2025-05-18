import {
  CloseCircleFilled,
  CheckCircleFilled,
  DownloadOutlined,
} from "@ant-design/icons";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  CircularProgress,
  Typography,
  DialogProps,
} from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import { MouseEventHandler } from "react";
import { FlexColumn, Flex } from "~/components/common";

interface IExportDialogProps extends DialogProps {
  error: string;
  downloadOptions?: {
    isLoading: boolean;
    isExportSuccess?: boolean;
    exportSuccessMessage: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };
  driveExportOptions?: {
    isLoading: boolean;
    isExportSuccess: boolean;
    exportSuccessMessage: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
}

export function ExportDialog({
  error,
  downloadOptions,
  driveExportOptions,
  ...rest
}: IExportDialogProps) {
  const getIsLoading = () => {
    return downloadOptions?.isLoading || driveExportOptions?.isLoading;
  };

  const getIsExportSuccess = () => {
    return (
      downloadOptions?.isExportSuccess || driveExportOptions?.isExportSuccess
    );
  };

  return (
    <Dialog {...rest} maxWidth="xs" fullWidth>
      <Box
        sx={{
          padding: "10px 16px 20px 16px",
          backgroundColor: error
            ? "#FFF1F0"
            : getIsExportSuccess()
            ? "#F6FFED"
            : "white",
        }}
      >
        <FlexColumn gap="10px">
          <Flex alignItems="center" gap="10px">
            {error ? (
              <>
                <CloseCircleFilled style={{ color: "#FF4D4F" }} />
                {t("error.genericErrorTitle")}
              </>
            ) : (
              !getIsLoading() &&
              getIsExportSuccess() && (
                <>
                  <CheckCircleFilled style={{ color: "#52C41A" }} />
                  {t("common.success")}
                </>
              )
            )}
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {getIsLoading() ? (
              <FlexColumn alignItems="center" gap="10px">
                <CircularProgress />
                <Typography>{t("common.exporting")}</Typography>
              </FlexColumn>
            ) : !error && getIsExportSuccess() ? (
              <Typography sx={{ whiteSpace: "pre-line" }}>
                {driveExportOptions?.isExportSuccess
                  ? t(driveExportOptions.exportSuccessMessage)
                  : t(downloadOptions?.exportSuccessMessage ?? "")}
              </Typography>
            ) : error ? (
              <Typography sx={{ whiteSpace: "pre-line" }}>
                {t("error.exportFailedMessage")}
              </Typography>
            ) : (
              <Typography sx={{ whiteSpace: "pre-line" }}>
                {t("common.chooseExportMethod")}
              </Typography>
            )}
          </Flex>
        </FlexColumn>

        {/* Show CSV Download and Drive option */}
        {!getIsLoading() && !error && (
          <FlexColumn gap="10px" sx={{ marginTop: "10px" }}>
            {downloadOptions && driveExportOptions && !getIsExportSuccess() && (
              <Flex gap="10px" justifyContent="center">
                <LoadingButton
                  variant="outlined"
                  loading={downloadOptions.isLoading}
                  startIcon={<DownloadOutlined />}
                  onClick={downloadOptions.onClick}
                  sx={{ bgcolor: "transparent" }}
                >
                  <Typography>{t("common.downloadAsCsv")}</Typography>
                </LoadingButton>

                <LoadingButton
                  variant="contained"
                  loading={driveExportOptions.isLoading}
                  onClick={driveExportOptions.onClick}
                >
                  <Typography>{t("common.exportToDrive")}</Typography>
                </LoadingButton>
              </Flex>
            )}
          </FlexColumn>
        )}
      </Box>
    </Dialog>
  );
}
