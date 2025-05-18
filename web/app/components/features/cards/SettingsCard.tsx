import { Flex, FlexColumn } from "~/components/common";
import { CardLayout } from "~/components/layout";
import {
  WorkspaceOverviewCard,
  CompanyInfoSettings,
  WorkspaceEmployeeSettings,
  ScheduleReportsSettings,
  VacationSettings,
  MonthlyExportSettings,
} from "~/components/features";
import { SubmissionResult } from "@conform-to/react";
import {
  IWorkspace,
  IWorkspaceUserResponse,
  WorkspaceSettingsAccordions as Accordions,
} from "~/types";
import { useTranslation } from "react-i18next";
import { useFormAccordions, useTablet } from "~/hooks";

interface SettingsCardProps {
  lastResult: SubmissionResult<string[]> | null;
  loaderData: {
    workspace: IWorkspace;
    workspaceUsers: IWorkspaceUserResponse[];
  } | null;
}

export function SettingsCard({ lastResult, loaderData }: SettingsCardProps) {
  const isTablet = useTablet();

  const workspace = loaderData?.workspace;
  const workspaceUsers = loaderData?.workspaceUsers ?? [];

  const { t } = useTranslation();

  // Get all accordion values from the enum
  const accordionValues = Object.values(Accordions);
  const {
    accordionStates,
    loadingStates,
    cancelStates,
    lastResults,
    toggleAccordion,
    toggleCancelState,
  } = useFormAccordions<Accordions>(accordionValues, lastResult);

  if (!workspace) {
    throw new Error(t("error.somethingWentWrong") as string);
  }

  return (
    <CardLayout>
      <FlexColumn gap="20px">
        <WorkspaceOverviewCard workspace={workspace} />

        <Flex gap="20px" sx={{ flexFlow: isTablet ? "row wrap" : undefined }}>
          <CompanyInfoSettings
            lastResult={lastResults}
            workspace={workspace}
            workspaceUsers={workspaceUsers}
            accordionStates={accordionStates}
            toggleAccordion={toggleAccordion}
            toggleCancelState={toggleCancelState}
            loadingStates={loadingStates}
            cancelStates={cancelStates}
          />
          <FlexColumn gap="20px" sx={{ width: "100%" }}>
            <WorkspaceEmployeeSettings
              lastResult={lastResults}
              workspace={workspace}
              accordionStates={accordionStates}
              toggleAccordion={toggleAccordion}
              toggleCancelState={toggleCancelState}
              loadingStates={loadingStates}
              cancelStates={cancelStates}
            />
            <ScheduleReportsSettings
              lastResult={lastResults}
              workspace={workspace}
              accordionStates={accordionStates}
              toggleAccordion={toggleAccordion}
              toggleCancelState={toggleCancelState}
              loadingStates={loadingStates}
              cancelStates={cancelStates}
            />
            <VacationSettings
              lastResult={lastResults}
              workspace={workspace}
              accordionStates={accordionStates}
              toggleAccordion={toggleAccordion}
              toggleCancelState={toggleCancelState}
              loadingStates={loadingStates}
              cancelStates={cancelStates}
            />
            <MonthlyExportSettings
              lastResult={lastResults}
              workspace={workspace}
              accordionStates={accordionStates}
              toggleAccordion={toggleAccordion}
              toggleCancelState={toggleCancelState}
              loadingStates={loadingStates}
              cancelStates={cancelStates}
            />
          </FlexColumn>
        </Flex>
      </FlexColumn>
    </CardLayout>
  );
}
