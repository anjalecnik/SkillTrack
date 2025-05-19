import { MainCard } from "~/components/common";
import { MonthlyExportForm } from "~/components/features";
import {
  WorkspaceSettingsAccordions as Accordions,
  SettingsCardProps,
} from "~/types";

import { useTranslation } from "react-i18next";

export function MonthlyExportSettings({
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
      title={t("workspaceSettings.monthlyExport")}
      sx={{ width: "100%" }}
    >
      <MonthlyExportForm
        workspace={workspace}
        lastResult={lastResult[Accordions.MonthlyExport]}
        open={accordionStates.monthlyExport}
        onAccordionClick={() => toggleAccordion(Accordions.MonthlyExport)}
        intent={Accordions.MonthlyExport}
        isLoading={loadingStates[Accordions.MonthlyExport]}
        onCancelClick={() => toggleCancelState(Accordions.MonthlyExport)}
        isCancelPressed={cancelStates[Accordions.MonthlyExport]}
      />
    </MainCard>
  );
}
