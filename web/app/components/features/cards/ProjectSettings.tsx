import { useTablet } from "~/hooks";
import { Flex, MainCard } from "~/components/common";
import {
  AddEmployeeToProjectDialogForm,
  ProjectInfoForm,
  ProjectParticipantsForm,
} from "~/components/features";
import { t } from "i18next";
import {
  WorkspaceProjectAccordions as Accordions,
  IProjectSettingsProps,
  IWorkspaceUser,
  Status,
} from "~/types";
import { useEffect, useState } from "react";
import { UserClient } from "~/clients";

export function ProjectSettings({
  lastResults,
  loaderData,
  accordionStates,
  cancelStates,
  toggleAccordion,
  toggleCancelState,
  loadingStates,
}: IProjectSettingsProps) {
  const isTablet = useTablet();

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | "">("");
  const [openParticipantPopup, setOpenParticipantPopup] = useState(false);
  const [selectedEmployeeData, setSelectedEmployeeData] =
    useState<IWorkspaceUser | null>(null);

  useEffect(() => {
    const lastResult = lastResults[Accordions.Employees];
    if (
      lastResult &&
      lastResult.status === Status.Success &&
      lastResult.initialValue &&
      lastResult.initialValue.intent
    ) {
      const key: string = lastResult.initialValue.intent as string;

      if (key === Accordions.Employees) {
        setOpenParticipantPopup(false);
        setSelectedEmployeeData(null);
        setSelectedEmployeeId("");
      }
    }
  }, [
    lastResults,
    setOpenParticipantPopup,
    setSelectedEmployeeData,
    setSelectedEmployeeId,
  ]);

  function handleEmployeeChange(id: number) {
    setSelectedEmployeeId(id);
  }

  async function handleAddClick() {
    if (!selectedEmployeeId) return;
    const user = await UserClient.getUserById({
      employeeId: selectedEmployeeId,
    });

    const projects = user.projects ?? [];
    user.projects = [
      {
        id: loaderData.project?.id ?? 0,
        name: loaderData.project?.name ?? "",
      },
      ...projects,
    ];

    setSelectedEmployeeData(user);
    setOpenParticipantPopup(true);
  }

  async function handleEditClick(employeeId: number) {
    const user = await UserClient.getUserById({
      employeeId,
    });
    setSelectedEmployeeData(user);
    setOpenParticipantPopup(true);
  }

  return (
    <Flex gap="20px" sx={{ flexFlow: isTablet ? "row wrap" : undefined }}>
      <MainCard
        content={false}
        title={t("common.settings")}
        sx={{ width: isTablet ? "100%" : "50%" }}
      >
        <ProjectInfoForm
          project={loaderData.project}
          lastResult={lastResults[Accordions.ProjectInfo]}
          open={accordionStates.projectInfo}
          onAccordionClick={() => toggleAccordion(Accordions.ProjectInfo)}
          onCancelClick={() => toggleCancelState(Accordions.ProjectInfo)}
          intent={Accordions.ProjectInfo}
          isLoading={loadingStates[Accordions.ProjectInfo]}
          isCancelPressed={cancelStates[Accordions.ProjectInfo]}
        />
        <ProjectParticipantsForm
          lastResult={lastResults[Accordions.Employees]}
          users={loaderData.users || []}
          project={loaderData.project}
          open={accordionStates.employees}
          onAccordionClick={() => toggleAccordion(Accordions.Employees)}
          intent={Accordions.Employees}
          onEmployeeChange={handleEmployeeChange}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          onClear={() => setSelectedEmployeeId("")}
          selectedEmployeeId={selectedEmployeeId}
        />
        <AddEmployeeToProjectDialogForm
          lastResult={lastResults[Accordions.Employees]}
          openParticipantPopup={openParticipantPopup}
          projects={loaderData.projects}
          selectedEmployeeData={selectedEmployeeData}
          setOpenParticipantPopup={setOpenParticipantPopup}
        />
      </MainCard>
    </Flex>
  );
}
