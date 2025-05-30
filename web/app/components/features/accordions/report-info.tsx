import { Divider, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "@remix-run/react";
import { t } from "i18next";
import { Dispatch, SetStateAction, useState } from "react";
import { Accordion, Flex, FlexColumn, MiniButton } from "~/components/common";
import { IReport, IWorkspaceProject } from "~/types";

interface IReportInfo {
  report: IReport;
}

const userProjectsToString = (projects: {
  project: IWorkspaceProject[];
}): string | null => {
  if (projects.project.length === 0) return null;
  return projects.project
    .map((project) => project._embedded?.name)
    .filter((name): name is string => !!name)
    .join(", ");
};

export function ReportInfo({ report }: IReportInfo) {
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
      {report.users && (
        <FlexColumn>
          {report.users.map((user, index) => (
            <Accordion
              key={index}
              title={`${user._embedded.user.firstName} ${user._embedded.user.lastName}`}
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
              onCancelClick={() => {
                setOpenAccordionKeys(
                  openAccordionKeys.filter((key) => key !== index)
                );
              }}
            >
              <>
                {user.projects.project.map((project, projectIndex) => (
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
                    <Grid
                      container
                      justifyContent="space-between"
                      paddingY="5px"
                    >
                      <Grid item xs={4}>
                        <Typography>
                          {project.daysOnProject ?? t("error.notPresent")}
                          <Typography color="grey.500">
                            {t("workspaceReports.daysOnProject")}
                          </Typography>
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
                      <Grid item xs={4}>
                        <Typography>
                          {project.businessTripsCount ?? t("error.notPresent")}
                        </Typography>
                        <Typography color="grey.500">
                          {t("workspaceReports.businessTripsCount")}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* <Grid container paddingTop="5px" paddingBottom="10px">
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
                    </Grid> */}
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
    </Box>
  );
}
