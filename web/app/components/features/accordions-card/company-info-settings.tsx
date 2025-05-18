import { MainCard, FlexColumn } from "~/components/common";
import {
  AdditionalAddressesForm,
  BasicInfoForm,
  TaxInfoForm,
  UserManagementForm,
} from "~/components/features";
import {
  IWorkspaceUserResponse,
  WorkspaceSettingsAccordions as Accordions,
  WorkspaceAddressType,
  SettingsCardProps,
} from "~/types";
import { useTranslation } from "react-i18next";

interface CompanyInfoAccordionsProps extends SettingsCardProps {
  workspaceUsers: IWorkspaceUserResponse[];
}

export function CompanyInfoSettings({
  lastResult,
  workspace,
  workspaceUsers,
  accordionStates,
  cancelStates,
  toggleAccordion,
  toggleCancelState,
  loadingStates,
}: CompanyInfoAccordionsProps) {
  const { t } = useTranslation();

  return (
    <FlexColumn gap="20px" sx={{ width: "100%" }}>
      <MainCard
        content={false}
        title={t("workspaceSettings.companyInfo")}
        sx={{ width: "100%" }}
      >
        <BasicInfoForm
          workspace={workspace}
          lastResult={lastResult[Accordions.BasicInfo]}
          open={accordionStates.basicInfo}
          onAccordionClick={() => toggleAccordion(Accordions.BasicInfo)}
          intent={Accordions.BasicInfo}
          isLoading={loadingStates[Accordions.BasicInfo]}
          onCancelClick={() => toggleCancelState(Accordions.BasicInfo)}
          isCancelPressed={cancelStates[Accordions.BasicInfo]}
        />
        <AdditionalAddressesForm
          workspace={workspace}
          lastResult={lastResult[Accordions.AdditionalAddress]}
          open={accordionStates.additionalAddress}
          onAccordionClick={() => toggleAccordion(Accordions.AdditionalAddress)}
          intent={Accordions.AdditionalAddress}
          isLoading={loadingStates[Accordions.AdditionalAddress]}
          disabled={
            !workspace.addresses.find(
              (address) => address.type === WorkspaceAddressType.Main
            )
          }
          onCancelClick={() => toggleCancelState(Accordions.AdditionalAddress)}
          isCancelPressed={cancelStates[Accordions.AdditionalAddress]}
        />
        <TaxInfoForm
          workspace={workspace}
          lastResult={lastResult[Accordions.TaxId]}
          open={accordionStates.taxId}
          onAccordionClick={() => toggleAccordion(Accordions.TaxId)}
          intent={Accordions.TaxId}
          isLoading={loadingStates[Accordions.TaxId]}
          onCancelClick={() => toggleCancelState(Accordions.TaxId)}
          isCancelPressed={cancelStates[Accordions.TaxId]}
        />
        <UserManagementForm
          workspace={workspace}
          lastResult={lastResult[Accordions.UserManagement]}
          open={accordionStates.userManagement}
          onAccordionClick={() => toggleAccordion(Accordions.UserManagement)}
          intent={Accordions.UserManagement}
          isLoading={loadingStates[Accordions.UserManagement]}
          users={workspaceUsers}
          onCancelClick={() => toggleCancelState(Accordions.UserManagement)}
          isCancelPressed={cancelStates[Accordions.UserManagement]}
        />
      </MainCard>
    </FlexColumn>
  );
}
