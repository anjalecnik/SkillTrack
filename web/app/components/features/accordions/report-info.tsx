import { Divider, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "@remix-run/react";
import { t } from "i18next";
import { Dispatch, SetStateAction, useState } from "react";
import { Accordion, Flex, FlexColumn, MiniButton } from "~/components/common";
import { DataTestIds } from "~/data-test-ids";
import { IReport, IWorkspaceProject } from "~/types";

interface IReportInfo {
  report: IReport;
  setIsExportDialogOpen: Dispatch<SetStateAction<boolean>>;
  onExport: () => Promise<void>;
}

const userProjectsToString = (projects: {
  workspaceProject: IWorkspaceProject[];
}): string | null => {
  if (projects.workspaceProject.length === 0) return null;
  return projects.workspaceProject
    .map((project) => project._embedded?.name)
    .filter((name): name is string => !!name)
    .join(", ");
};

export function ReportInfo({
  report,
  setIsExportDialogOpen,
  onExport,
}: IReportInfo) {
  const [openAccordionKeys, setOpenAccordionKeys] = useState<number[]>([]);

  const params = useParams();
  const navigate = useNavigate();

  return (
    <Box>
      <Flex justifyContent="space-between" gap="20px" padding="20px 40px">
        <FlexColumn alignItems="center">
          <Typography>{report.total.workDays}</Typography>
          <Typography color="grey.500">
            {t("workspaceReports.workDays")}
          </Typography>
        </FlexColumn>
        <FlexColumn alignItems="center">
          <Typography>{report.total.daysOnProjectSum}</Typography>
          <Typography color="grey.500">
            {t("workspaceReports.totalDaysOnProjects")}
          </Typography>
        </FlexColumn>
        <FlexColumn alignItems="center">
          <Typography>{report.total.daysOffProjectSum}</Typography>
          <Typography color="grey.500">
            {t("workspaceReports.totalDaysOffProjects")}
          </Typography>
        </FlexColumn>
      </Flex>
      <Divider />
      {report.workspaceUsers && (
        <FlexColumn>
          {report.workspaceUsers.map((user, index) => (
            <Accordion
              key={index}
              titleDataTestId={DataTestIds.reports.employeeIds + user._embedded.workspaceUser.workspaceUserId}
              title={`${user._embedded.workspaceUser.firstName} ${user._embedded.workspaceUser.lastName}`}
              desc={
                userProjectsToString(user.projects) ?? t("error.notPresent")
              }
              open={
                openAccordionKeys.find((key) => key === index)! >= 0
                  ? true
                  : false
              }
              onAccordionClick={() => {
                setOpenAccordionKeys([...openAccordionKeys, index]);
              }}
              onAccordionTitleClick={() =>
                navigate(
                  `/workspace-hub/${params.workspaceId}/employees/${user._embedded.workspaceUser.workspaceUserId}`
                )
              }
              onCancelClick={() => {
                setOpenAccordionKeys(
                  openAccordionKeys.filter((key) => key !== index)
                );
              }}
            >
              <>
                {user.projects.workspaceProject.map((project, projectIndex) => (
                  <FlexColumn
                    gap="25%"
                    padding="10px 40px 0px 40px"
                    key={projectIndex}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {project._embedded?.name}
                    </Typography>
                    <Grid container paddingTop="5px" paddingBottom="10px">
                      <Grid item xs={4}>
                        <Typography>
                          {project.daysOnProject ?? t("error.notPresent")}
                        </Typography>
                        <Typography color="grey.500">
                          {t("workspaceReports.daysOnProject")}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>
                          {project.daysOffProject ?? t("error.notPresent")}
                        </Typography>
                        <Typography color="grey.500">
                          {t("workspaceReports.daysOffProject")}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </FlexColumn>
                ))}
                <FlexColumn gap="25%" padding="10px 40px">
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    {t("workspaceReports.other")}
                  </Typography>
                  <Grid container justifyContent="space-between" paddingY="5px">
                    <Grid item xs={4}>
                      <Typography>
                        {user.totalUser.publicHolidayCount ??
                          t("error.notPresent")}
                        <Typography color="grey.500">
                          {t("workspaceReports.nationalHolidays")}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        {user.totalUser.vacationCount ?? t("error.notPresent")}
                      </Typography>
                      <Typography color="grey.500">
                        {t("workspaceReports.vacation")}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        {user.totalUser.sickLeaveCount ?? t("error.notPresent")}
                      </Typography>
                      <Typography color="grey.500">
                        {t("workspaceReports.sickLeave")}
                      </Typography>
                    </Grid>
                  </Grid>
                </FlexColumn>
              </>
            </Accordion>
          ))}
        </FlexColumn>
      )}

      <MiniButton
        name="export"
        type="button"
        size="extraSmall"
        variant="contained"
        sx={{ float: "right", margin: "10px 20px 10px 0px" }}
        onClick={(e) => {
          e.stopPropagation();
          setIsExportDialogOpen(true);
          onExport();
        }}
      >
        {t("common.export")}
      </MiniButton>
    </Box>
  );
}
