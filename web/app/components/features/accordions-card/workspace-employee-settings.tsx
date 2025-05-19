import { MainCard } from "~/components/common";
import {
  ConfirmationMailRecipientsForm,
  InvitationTextForm,
  WhiteListDomainForm,
} from "~/components/features";
import {
  WorkspaceSettingsAccordions as Accordions,
  SettingsCardProps,
} from "~/types";
import { useTranslation } from "react-i18next";

export function WorkspaceEmployeeSettings({
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
      title={t("workspaceSettings.workspaceEmployeesSettings")}
      sx={{ width: "100%" }}
    >
      <WhiteListDomainForm
        workspace={workspace}
        lastResult={lastResult[Accordions.WhitelistDomain]}
        open={accordionStates.whitelistDomain}
        onAccordionClick={() => toggleAccordion(Accordions.WhitelistDomain)}
        intent={Accordions.WhitelistDomain}
        isLoading={loadingStates[Accordions.WhitelistDomain]}
        onCancelClick={() => toggleCancelState(Accordions.WhitelistDomain)}
        isCancelPressed={cancelStates[Accordions.WhitelistDomain]}
      />
      <InvitationTextForm
        workspace={workspace}
        lastResult={lastResult[Accordions.InvitationText]}
        open={accordionStates.invitationText}
        onAccordionClick={() => toggleAccordion(Accordions.InvitationText)}
        intent={Accordions.InvitationText}
        isLoading={loadingStates[Accordions.InvitationText]}
        onCancelClick={() => toggleCancelState(Accordions.InvitationText)}
        isCancelPressed={cancelStates[Accordions.InvitationText]}
      />
      <ConfirmationMailRecipientsForm
        workspace={workspace}
        lastResult={lastResult[Accordions.AdditionalReceiptsAfterConfirmation]}
        open={accordionStates.additionalReceiptsAfterConfirmation}
        onAccordionClick={() =>
          toggleAccordion(Accordions.AdditionalReceiptsAfterConfirmation)
        }
        intent={Accordions.AdditionalReceiptsAfterConfirmation}
        isLoading={loadingStates[Accordions.AdditionalReceiptsAfterConfirmation]}
        onCancelClick={() =>
          toggleCancelState(Accordions.AdditionalReceiptsAfterConfirmation)
        }
        isCancelPressed={cancelStates[Accordions.AdditionalReceiptsAfterConfirmation]}
      />
    </MainCard>
  );
}
