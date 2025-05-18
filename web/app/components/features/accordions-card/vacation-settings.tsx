import { MainCard } from "~/components/common";
import { SettingsVacationsForm } from "~/components/features";
import {
  WorkspaceSettingsAccordions as Accordions,
  SettingsCardProps,
} from "~/types";
import { useTranslation } from "react-i18next";

export function VacationSettings({
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
      title={t("workspaceSettings.vacations")}
      sx={{ width: "100%" }}
    >
      <SettingsVacationsForm
        workspace={workspace}
        lastResult={lastResult[Accordions.Vacations]}
        open={accordionStates.vacations}
        onAccordionClick={() => toggleAccordion(Accordions.Vacations)}
        intent={Accordions.Vacations}
        isLoading={loadingStates[Accordions.Vacations]}
        onCancelClick={() => toggleCancelState(Accordions.Vacations)}
        isCancelPressed={cancelStates[Accordions.Vacations]}
      />
    </MainCard>
  );
}
