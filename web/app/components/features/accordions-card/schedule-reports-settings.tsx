import { MainCard } from "~/components/common";
import { SetTimeForm } from "~/components/features";
import {
  WorkspaceSettingsAccordions as Accordions,
  SettingsCardProps,
} from "~/types";
import { useTranslation } from "react-i18next";

export function ScheduleReportsSettings({
  lastResult,
  workspace,
  accordionStates,
  cancelStates,
  toggleAccordion,
  toggleCancelState,
  loadingStates,
}: SettingsCardProps) {
  const { t } = useTranslation();

  return (
    <MainCard
      content={false}
      title={t("workspaceSettings.scheduleReports")}
      sx={{ width: "100%" }}
    >
      <SetTimeForm
        workspace={workspace}
        lastResult={lastResult[Accordions.SetTime]}
        open={accordionStates.setTime}
        onAccordionClick={() => toggleAccordion(Accordions.SetTime)}
        intent={Accordions.SetTime}
        isLoading={loadingStates[Accordions.SetTime]}
        onCancelClick={() => toggleCancelState(Accordions.SetTime)}
        isCancelPressed={cancelStates[Accordions.SetTime]}
      />
    </MainCard>
  );
}
