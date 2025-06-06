import { SubmissionResult } from "@conform-to/react";
import { t } from "i18next";
import { FlexColumn, MainCard } from "~/components/common";
import {
  AddressSettingsForm,
  VacationsForm,
  ProjectAssignForm,
  PersonalSettingsForm,
  EmployeeWorkPositionForm,
  UserStatusForm,
} from "~/components/features";
import { useFormAccordions, useTablet } from "~/hooks";
import {
  IWorkspaceUser,
  EmployeeSettingsAccordions as Accordions,
  IProject,
  IPositionResponse,
  IUserResponse,
} from "~/types";

interface IEmployeeSettingsProps {
  lastResult: SubmissionResult<string[]> | null;
  loaderData: {
    user: IWorkspaceUser;
    projects: null[] | IProject[];
    users: IUserResponse[];
    positions: IPositionResponse[] | null[];
  };
}

export function EmployeeSettings({
  lastResult,
  loaderData,
}: IEmployeeSettingsProps) {
  const { user, projects, positions, users } = loaderData;

  const accordionValues = Object.values(Accordions);
  const isTablet = useTablet();

  const {
    accordionStates,
    loadingStates,
    cancelStates,
    lastResults,
    toggleAccordion,
    toggleCancelState,
  } = useFormAccordions<Accordions>(accordionValues, lastResult);

  return (
    <FlexColumn gap="20px" sx={{ flexFlow: isTablet ? "row wrap" : undefined }}>
      <MainCard
        content={false}
        title={t("common.settings")}
        sx={{ width: isTablet ? "100%" : "50%" }}
      >
        <PersonalSettingsForm
          workspaceUser={user}
          lastResult={lastResults[Accordions.PersonalSettings]}
          open={accordionStates.personalSettings}
          onAccordionClick={() => toggleAccordion(Accordions.PersonalSettings)}
          intent={Accordions.PersonalSettings}
          isLoading={loadingStates[Accordions.PersonalSettings]}
          onCancelClick={() => toggleCancelState(Accordions.PersonalSettings)}
          isCancelPressed={cancelStates[Accordions.PersonalSettings]}
        />
        <AddressSettingsForm
          workspaceUser={user}
          lastResult={lastResults[Accordions.Address]}
          open={accordionStates.address}
          onAccordionClick={() => toggleAccordion(Accordions.Address)}
          intent={Accordions.Address}
          isLoading={loadingStates[Accordions.Address]}
          disabled={false}
          onCancelClick={() => toggleCancelState(Accordions.Address)}
          isCancelPressed={cancelStates[Accordions.Address]}
        />
        <ProjectAssignForm
          workspaceUser={user}
          workspaceProjects={projects ?? []}
          lastResult={lastResults[Accordions.Projects]}
          open={accordionStates.projects}
          onAccordionClick={() => toggleAccordion(Accordions.Projects)}
          intent={Accordions.Projects}
          isLoading={loadingStates[Accordions.Projects]}
          onCancelClick={() => toggleCancelState(Accordions.Projects)}
          isCancelPressed={cancelStates[Accordions.Projects]}
        />

        <EmployeeWorkPositionForm
          workspaceUser={user}
          workspacePositions={positions ?? []}
          workspaceUsers={users ?? []}
          lastResult={lastResults[Accordions.WorkPosition]}
          open={accordionStates.workPosition}
          onAccordionClick={() => toggleAccordion(Accordions.WorkPosition)}
          intent={Accordions.WorkPosition}
          isLoading={loadingStates[Accordions.WorkPosition]}
          onCancelClick={() => toggleCancelState(Accordions.WorkPosition)}
          isCancelPressed={cancelStates[Accordions.WorkPosition]}
        />

        <UserStatusForm
          lastResult={lastResults[Accordions.UserStatus]}
          open={accordionStates.userStatus}
          isCancelPressed={cancelStates[Accordions.UserStatus]}
          onAccordionClick={() => toggleAccordion(Accordions.UserStatus)}
          onCancelClick={() => toggleCancelState(Accordions.UserStatus)}
          workspaceUser={user}
          intent={Accordions.UserStatus}
          isLoading={loadingStates[Accordions.UserStatus]}
        />
      </MainCard>
    </FlexColumn>
  );
}
