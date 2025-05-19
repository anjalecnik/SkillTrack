import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import {
  FormAccordion,
  FormDateInput,
  FormWrapper,
  MiniButton,
  PaddedFlexColumn,
} from "~/components/common";
import { IWorkspaceSettingsFormCommonProps } from "~/types";
import { monthlyExportFormSchema as schema } from "~/schemas";
import { useState } from "react";
import { DateValidationError } from "@mui/x-date-pickers";
import { formatDate } from "~/util";
import { WorkspaceClient } from "~/clients";
import { useParams } from "@remix-run/react";
import { ExportDialog } from "../dialogs/export-dialog";
import { downloadCSV } from "~/util/download-csv";

export function MonthlyExportForm({
  lastResult,
  workspace,
  open,
  onAccordionClick,
  onCancelClick,
  intent,
  isLoading,
  isCancelPressed,
}: IWorkspaceSettingsFormCommonProps) {
  const { t } = useTranslation();
  const params = useParams();
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isFormErrored, setIsFormErrored] = useState(false);
  const description =
    dayjs(workspace.activityLockDate).format("DD. MMM, YYYY") ??
    t("workspaceSettings.notSetYet");

  const currentDate = dayjs();
  const [exportSelectedMonth, setExportSelectedMonth] = useState<Dayjs | null>(
    currentDate
  );
  const [lockDate, setLockDate] = useState<Dayjs | null>(
    dayjs(workspace.activityLockDate)
  );
  const [isDriveExportButtonLoading, setIsDriveExportButtonLoading] =
    useState(false);
  const [isDownloadButtonLoading, setIsDownloadButtonLoading] = useState(false);
  const [isDriveExportSuccess, setIsDriveExportSuccess] = useState(false);
  const [isDownloadExportSuccess, setIsDownloadExportSuccess] = useState(false);
  const [error, setError] = useState("");

  const startExport = async (exportMonth?: string) => {
    setIsDriveExportButtonLoading(true);
    setIsDriveExportSuccess(false);

    try {
      const { exportRequest } = getExportRequest(exportMonth);

      await Promise.all([
        WorkspaceClient.exportMonthly(
          Number(params.workspaceId),
          exportRequest
        ),
        WorkspaceClient.exportDaily(Number(params.workspaceId), exportRequest),
      ]);

      setIsDriveExportSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsDriveExportButtonLoading(false);
    }
  };

  const startDownload = async (exportMonth?: string) => {
    setIsDownloadButtonLoading(true);
    try {
      const { exportRequest } = getExportRequest(exportMonth);

      const { daily, monthly } = await WorkspaceClient.downloadDailyAndMonthly(
        Number(params.workspaceId),
        exportRequest
      );

      downloadCSV(
        daily,
        `Daily Exports ${currentDate.format("YYYY-MM-DD")}.csv`
      );
      downloadCSV(
        monthly,
        `Monthly Exports ${currentDate.format("YYYY-MM-DD")}.csv`
      );
      setIsDownloadExportSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsDownloadButtonLoading(false);
    }
  };

  const getExportRequest = (exportMonth?: string) => {
    const dateStart = dayjs(exportMonth, "MMMM, YYYY");
    const dateEnd = dateStart.add(1, "month").subtract(1, "second");

    return {
      dateStart,
      dateEnd,
      exportRequest: {
        fromDateStart: {
          date: formatDate(dateStart, undefined, "YYYY-MM-DD"),
          time: formatDate(dateStart, undefined, "HH:mm"),
        },
        toDateEnd: {
          date: formatDate(dateEnd, undefined, "YYYY-MM-DD"),
          time: formatDate(dateEnd, undefined, "HH:mm"),
        },
      },
    };
  };

  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`monthly-export-form-${open}-${isCancelPressed}`}
      shouldValidate="onSubmit"
      intent={intent}
    >
      {(form) => {
        const fields = form && form.getFieldset();
        return (
          <div>
            <FormAccordion
              title={t("workspaceSettings.monthlyExportDescription")}
              desc={description}
              open={open}
              onAccordionClick={() => onAccordionClick(intent)}
              borderTop
              isLoading={isLoading}
              openButtons={
                <>
                  <MiniButton
                    loading={isLoading}
                    size="extraSmall"
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAccordionClick(intent);
                      onCancelClick();
                    }}
                  >
                    {t("common.cancel")}
                  </MiniButton>
                  <MiniButton
                    loading={isLoading}
                    type="submit"
                    name="lock"
                    size="extraSmall"
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    disabled={
                      lockDate?.format("DD. MMM, YYYY") ===
                        dayjs(workspace.activityLockDate).format(
                          "DD. MMM, YYYY"
                        ) || isFormErrored
                    }
                  >
                    {t("common.lock")}
                  </MiniButton>
                  <MiniButton
                    name="export"
                    type="button"
                    size="extraSmall"
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExportDialogOpen(true);
                    }}
                  >
                    {t("common.export")}
                  </MiniButton>
                </>
              }
            >
              <PaddedFlexColumn>
                <FormDateInput
                  fieldName="activityLockDate"
                  defaultValue={lockDate}
                  maxDate={dayjs()}
                  label={t("workspaceSettings.lockUntil")}
                  required
                  format="DD. MMM, YYYY"
                  onError={(error: DateValidationError) => {
                    setIsFormErrored(error ? true : false);
                  }}
                  errorMessage={t("error.maximalAllowedDateIs", {
                    date: dayjs().format("DD. MMM, YYYY"),
                  })}
                  onChange={(date) => setLockDate(date)}
                />

                <FormDateInput
                  views={["month", "year"]}
                  label={t("workspaceSettings.exportForMonth")}
                  fieldName="exportMonth"
                  defaultValue={exportSelectedMonth}
                  format="MMMM, YYYY"
                  onChange={(date) => setExportSelectedMonth(date)}
                />
              </PaddedFlexColumn>
            </FormAccordion>

            <ExportDialog
              title="Export"
              open={isExportDialogOpen}
              error={error}
              downloadOptions={{
                isLoading: isDownloadButtonLoading,
                isExportSuccess: isDownloadExportSuccess,
                exportSuccessMessage:
                  "workspaceSettings.exportDownloadSuccessMessage",
                onClick: (e) => {
                  e.stopPropagation();
                  startDownload(
                    exportSelectedMonth
                      ? exportSelectedMonth.format("MMMM, YYYY")
                      : (fields?.exportMonth?.value as string)
                  );
                },
              }}
              driveExportOptions={{
                isLoading: isDriveExportButtonLoading,
                isExportSuccess: isDriveExportSuccess,
                exportSuccessMessage:
                  "workspaceSettings.exportDriveSuccessMessage",
                onClick: (e) => {
                  e.stopPropagation();
                  startExport(
                    exportSelectedMonth
                      ? exportSelectedMonth.format("MMMM, YYYY")
                      : (fields?.exportMonth?.value as string)
                  );
                },
              }}
              onClose={() => {
                setIsExportDialogOpen(false);
                setIsDriveExportSuccess(false);
                setIsDownloadExportSuccess(false);
                setError("");
              }}
            />
          </div>
        );
      }}
    </FormWrapper>
  );
}
